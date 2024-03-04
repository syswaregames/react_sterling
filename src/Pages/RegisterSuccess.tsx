import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ReactComponent as LatitudeIcon } from "../Assets/Svg/LatitudeIcon.svg";
import { ReactComponent as LoginIcon } from "../Assets/Svg/box-arrow-in-right.svg";
import {
  ILoginRequest,
  IRegisterRequest,
  loginThunk,
} from "../Store/Slices/UserSlice";
import { AppDispatch, RootState } from "../Store/Store";
import Button from "../UIKit/Button";
import FormControl from "../UIKit/FormControl";
import PasswordInput from "../UIKit/PasswordInput";
import TextInput from "../UIKit/TextInput";
import { EPinLogo } from "../Components/EPinLogo";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(5, "Must contain at least 5 characters")
    .email("Invalid email")
    .required("Required"),
  password: yup
    .string()
    .min(4, "Must contain at least 5 characters")
    .required("Required"),
  repeatPassword: yup
    .string()
    .min(4, "Must contain at least 5 characters")
    .oneOf([yup.ref("password"), null as any], "Passwords do not match")
    .required("Required"),
});

export function RegisterSuccess() {
  return (
    <section
      className="bg-base-200 h-full flex flex-col 
    justify-center items-center 
    bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] 
    bg-center bg-cover"
    >
      <form className="w-[400px] bg-base-100 rounded-lg p-8 shadow-md font-inter">
        <EPinLogo />
        <h1 className="text-2xl font-bold mb-5">Successfully registered!!</h1>
        <div className="">Now <Link to='/login' className="text-primary hover:underline">log in</Link> to your account</div>
        
      </form>
    </section>
  );
}
