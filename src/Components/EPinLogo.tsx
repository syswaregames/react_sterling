import ePINIconPng from '../Assets/Png/online-course.png';

export function EPinLogo() {

  return (<div className="flex gap-2 justify-center items-center mb-5">
    <img src={ePINIconPng} width={48} height={48} alt="EPin Logo" />
    <div className="font-inter text-5xl font-bold">ePIN</div>
  </div>);
}
