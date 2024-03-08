import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./Store/Store";
import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Button from "./UIKit/Button";
import {
  getProgramPermissionsThunk,
  loginThunk,
  logout,
} from "./Store/Slices/UserSlice";
import { ReactComponent as LatitudeIcon } from "./Assets/Svg/LatitudeIcon.svg";
import { ReactComponent as HomeIcon } from "./Assets/Svg/house-door-fill.svg";
import { ReactComponent as RelatoryIcon } from "./Assets/Svg/file-ruled-fill.svg";
import { EPinLogo } from "./Components/EPinLogo";
import MyCourses from "./Pages/MyCourses";
import MyCourse from "./Pages/MyCourse";
import Class_ from "./Pages/Class_";
import ManageCourses from "./Pages/ManageCourses";
import CreateCourse from "./Pages/CreateCourse";
import EditCourse from "./Pages/EditCourse";

export default function AppFrame() {
  const jwt = useSelector((x: RootState) => x.userReducer.jwt);
  const userId = useSelector((x: RootState) => x.userReducer.email);
  const permissions = useSelector(
    (x: RootState) => x.userReducer.programPermissions
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!jwt) {
      navigate("Login");
    } else {
      if (!permissions) {
        dispatch(getProgramPermissionsThunk());
      }
    }
  }, [jwt, permissions]);

  return (
    <section id="frame" className="flex flex-nowrap h-full">
      <aside
        className="flex-shrink-0 w-[300px] items-stretch border-r text-left p-5 flex flex-col"
        style={{ backgroundColor: "rgb(251, 252, 254)" }}
      >
        <EPinLogo />
        <ul className="flex-grow">
          <Li label="Home" icon={HomeIcon} to="/" />
          <Li label="My courses" icon={RelatoryIcon} to="/MyCourses" />
          <Li label="Manage courses" icon={RelatoryIcon} to="/ManageCourses" />
        </ul>
        <div className="pt-5 border-t flex gap-2 flex-nowrap items-center">
          <div className="bg-primary w-[32px] h-[32px] rounded-full text-center leading-8 font-bold text-white text-2xl">
            S
          </div>
          <div className="flex-grow">{userId}</div>
          <Button
            variant="ghost"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            }
            content=""
            onClick={() => {
              dispatch(logout());
            }}
          />
        </div>
      </aside>
      <main className="flex-grow overflow-auto text-left">
        <Routes>
          <Route path="/myCourses" element={<MyCourses />} />
          <Route path="/myCourses/:id" element={<MyCourse />} />
          <Route path="/myCourses/:id/class/:idClass" element={<Class_ />} />
          <Route path="/manageCourses" element={<ManageCourses />} />
          <Route path="/manageCourses/create" element={<CreateCourse />} />
          <Route path="/manageCourses/edit/:id" element={<EditCourse />} />
          <Route path="*" element={<div></div>} />
        </Routes>
      </main>
    </section>
  );
}
function Li({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <li className="flex gap-2">
      <Link
        to={to}
        className="font-medium hover:bg-base-300 flex gap-2 w-full p-2 rounded-lg"
      >
        <Icon width={22} height={22} className="opacity-60" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
