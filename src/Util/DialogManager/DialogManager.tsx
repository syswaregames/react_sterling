import React, { useState } from "react";
import "./style.css";

const headerColor = {
	error: "bg-error",
	warning: "bg-warning",
	success: "bg-success",
	primary: "bg-primary",
	secondary: "bg-secondary",
};

type WindowWrapperColors = "error" | "warning" | "success" | "primary" | "secondary";

export default function ModalContainer() {
	const [contentComponents, setContentComponents] = useState<React.ReactNode[]>([]);
	opennedModalQuantity = contentComponents.length;

	addModalContentComponents = (node: React.ReactNode) => {
		setContentComponents([...contentComponents, node]);
	};
	subtractModalContentComponents = () => {
		contentComponents.pop();
		setContentComponents([...contentComponents]);
	};
	if (contentComponents.length === 0) return <></>;

	return (
		<div id="modal-container" className={`screen:fixed print:absolute top-0 left-0 w-full screen:h-full z-50`}>
			{contentComponents &&
				contentComponents.map((item) => (
					<>
						<div
							className="w-full h-full absolute modal-fade-in modal-background"
							onClick={() => CloseModal(false)}
						/>
						<div
							id="modal-layer"
							className="screen:h-full screen:w-full absolute pointer-events-none children:pointer-events-auto"
						>
							{item}
						</div>
					</>
				))}
		</div>
	);
}

let setModalContentComponent = (state: React.ReactNode) => {};
let addModalContentComponents = (state: React.ReactNode) => {};
let subtractModalContentComponents = () => {};
let _closeCallback: ((success?: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
let opennedModalQuantity = 0;

/**
 * Exibe um modal com o conteudo JSX. 
 * @param title 
 * @param Component 
 * @param closeCallback 
 * @param color 
 * @param fullScreen 
 * @param printable Durante a print todo o site fica como display: hidden. E se vc ativar printable para true, somente a modal será visivel no site durante o print. Isto serve para imprimir coisas.
 */
export async function ShowModalAsync({
	title,
	component,
	closeCallback,
	color = "primary",
	fullScreen = false,
	printable = false,
}: {
	title: React.ReactNode;
	component: React.ReactNode;
	closeCallback?: (success?: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	color?: WindowWrapperColors;
	fullScreen?: boolean;
	printable?: boolean;
}) {
	if (!fullScreen) {
		addModalContentComponents(
			<ModalWrappingWindow title={title} color={color} printable={printable}>
				{component}
			</ModalWrappingWindow>
		);
	} else {
		addModalContentComponents(<FullScreenWrapper>{component}</FullScreenWrapper>);
	}
	_closeCallback = closeCallback!;
	let currentOpenedModalQuantity = opennedModalQuantity;
	opennedModalQuantity += 1;
	while (opennedModalQuantity > currentOpenedModalQuantity) {
		await waitForSeconds(0.1);
	}
}
export const ShowModalHeadless = (
	Component: JSX.Element,
	closeCallback?: (success?: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	color: WindowWrapperColors = "primary"
) => {
	addModalContentComponents(<>{Component}</>);

	_closeCallback = closeCallback!;
};
export const CloseModal = (success?: boolean | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	setModalContentComponent(null);
	subtractModalContentComponents();
	if (_closeCallback) {
		_closeCallback(success!);
		_closeCallback = undefined;
	}
};

window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		CloseModal();
	}
});

export function ShowOkModalAsync(
	title: string,
	Content: string | JSX.Element,
	color: WindowWrapperColors = "primary",
	closeCallback?: () => void
) {
	if (typeof Content == "string") Content = <section className="p-5">{Content}</section>;
	return new Promise<void>((resolve) => {
		ShowModalAsync({
			title,
			component: (
				<div id="ok-modal" className="max-w-[100vw] min-w-[300px] pt-5">
					{Content}
					<div className="text-center mb-5">
						<button
							id="ok"
							className="btn btn-primary glow mt-5"
							onClick={() => {
								CloseModal();
								resolve();
							}}
						>
							OK
						</button>
					</div>
				</div>
			),
			closeCallback: () => {
				if (closeCallback) {
					closeCallback();
					resolve();
				}
			},
			color,
		});
	});
}

export async function ShowConfirmModalAsync({
	title,
	content: Content,
	color = "primary",
	confirmationText,
}: {
	title: string;
	content: React.ReactNode;
	color?: WindowWrapperColors;
	confirmationText?: string;
}) {
	return new Promise<boolean>((resolve) => {
		ShowModalAsync({
			title,
			component: (
				<ConfirmModalComponent
					title={title}
					Content={Content}
					color={color}
					confirmationText={confirmationText}
					resolve={resolve}
				/>
			),
			closeCallback: () => {
				resolve(false);
			},
			color,
		});
	});
}
function ConfirmModalComponent({
	title,
	Content,
	color,
	confirmationText,
	resolve,
}: {
	title: string;
	Content: React.ReactNode;
	color: WindowWrapperColors;
	confirmationText?: string;
	resolve: (result: boolean) => void;
}) {
	const [text, setText] = useState("");
	return (
		<div id="do-you-want-proceed-modal" className="max-w-[100vw] min-w-[300px] pt-5 p-5">
			{Content}
			{confirmationText && (
				<div className="text-center">
					<label className="mx-auto">
						Digite <b>{confirmationText}</b> para prosseguir:
					</label>
					<input
						id="confirmation-text-input"
						value={text}
						autoFocus
						onChange={(e) => setText(e.target.value)}
						className={
							"input input-bordered input-sm block mx-auto" +
							(text !== confirmationText ? " input-error" : "")
						}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								resolve(true);
								CloseModal();
							}
						}}
					/>
				</div>
			)}
			<div className="flex justify-between mt-5">
				<button
					id="no"
					className="btn btn-primary btn-outline"
					onClick={() => {
						resolve(false);
						CloseModal();
					}}
				>
					Não
				</button>
				<button
					id="yes"
					className="btn btn-primary glow"
					disabled={confirmationText && text !== confirmationText ? true : false}
					onClick={() => {
						resolve(true);
						CloseModal();
					}}
				>
					Sim
				</button>
			</div>
		</div>
	);
}

export function ModalWrappingWindow({
	title,
	color = "primary",
	children,
	printable,
}: {
	title: React.ReactNode;
	color?: WindowWrapperColors;
	children: any;
	printable?: boolean;
}) {
	return (
		<div
			id="modal"
			className={
				" screen:absolute screen:left-1/2 screen:top-1/2 shadow-lg text-lg max-w-[100vw] window-wrapper-transition"
			}
		>
			<div className="screen:w-full hidden"></div>
			<header
				className={`${headerColor[color]} text-secondary-content p-2 font-bold flex items-center rounded-t-btn -mb-0.5`}
			>
				<div className="flex-grow">{title}</div>
				<button id="close-modal" className="float-right" onClick={() => CloseModal(false)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={32}
						height={32}
						fill="currentColor"
						className="bi bi-x-square-fill"
						viewBox="0 0 16 16"
					>
						<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
					</svg>
				</button>
			</header>
			<div className={"bg-base-200 rounded-b-btn max-h-[calc(100vh-50px)] overflow-auto table-scrollbar"}>
				{children}
			</div>
		</div>
	);
}

export function FullScreenWrapper({ children }: { children: any }) {
	return (
		<div className="screen:shadow-lg text-lg screen:max-w-[100vw] screen:h-full">
			<div id="entrada-body" className="screen:max-h-[calc(100vh)] screen:h-full">
				{children}
			</div>
		</div>
	);
}

const waitForSeconds = function (seconds: number) {
	return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), seconds * 1000));
};
