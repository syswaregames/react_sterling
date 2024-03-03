import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ReactComponent as LatitudeIcon } from "../Assets/Svg/LatitudeIcon.svg";
import { ReactComponent as LoginIcon } from "../Assets/Svg/box-arrow-in-right.svg";
import { ILoginRequest, loginThunk } from "../Store/Slices/UserSlice";
import { AppDispatch, RootState } from "../Store/Store";
import Button from "../UIKit/Button";
import FormControl from "../UIKit/FormControl";
import PasswordInput from "../UIKit/PasswordInput";
import TextInput from "../UIKit/TextInput";

const schema = yup.object().shape({
  login: yup
    .string()
    .min(5, "Deve conter no mínimo 5 caracteres")
    .required("O campo login é obrigatório"),
  password: yup
    .string()
    .min(5, "Deve conter no mínimo 3 caracteres")
    .required("O campo senha é obrigatório"),
});

export function Login() {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik<ILoginRequest>({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (val) => {
      await dispatch(
        loginThunk({
          password: formik.values.password,
          login: formik.values.login,
        })
      );
    },
    validationSchema: schema,
  });

  const loginStatus = useSelector((x: RootState) => x.userReducer.status);
  const jwt = useSelector((x: RootState) => x.userReducer.jwt);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);
  const errors = formik.submitCount > 0 ? formik.errors : {};
  return (
    <section
      className="bg-base-200 h-full flex flex-col 
    justify-center items-center 
    bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] 
    bg-center bg-cover"
    >
      <form className="w-[400px] bg-base-100 rounded-lg p-8 shadow-md font-inter">
        <LatitudeIcon height={48} width={200} className="mx-auto mb-5" />
        <h1 className="text-2xl font-bold mb-5">Faça login na sua conta</h1>
        <div className="flex flex-col gap-4">
          <FormControl
            label="Login"
            input={<TextInput {...formik.getFieldProps("login")} />}
            error={errors.login}
          />
          <FormControl
            label="Senha"
            input={
              <PasswordInput
                {...formik.getFieldProps("password")}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    formik.submitForm();
                  }
                }}
              />
            }
            error={errors.password}
          />

          <div>
            <Button
              content="Logar"
              className="w-full"
              disabled={!formik.isValid}
              icon={<LoginIcon width={22} height={22} />}
              onClick={formik.submitForm}
            />
          </div>
          <div className="h-4">
            {loginStatus === "wrongPasswordOrLogin" && (
              <div className="text-error text-sm opacity-80">
                * Login ou senha errados
              </div>
            )}
            {loginStatus === "connectionFail" && (
              <div className="text-error text-sm opacity-80">
                * Falha na conexão
              </div>
            )}
            {loginStatus === "other" && (
              <div className="text-error text-sm opacity-80">
                * Falha desconhecida
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
