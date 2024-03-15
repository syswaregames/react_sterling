import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ReactComponent as LatitudeIcon } from "../Assets/Svg/LatitudeIcon.svg";
import { ReactComponent as LoginIcon } from "../Assets/Svg/box-arrow-in-right.svg";
import { ILoginRequest, loginThunk } from "../Store/Slices/UserSlice";
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
});

export function Login() {
  const dispatch: AppDispatch = useDispatch();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const formik = useFormik<ILoginRequest>({
    initialValues: {
      email: "",
      password: "",
      userType: 1,
    },
    enableReinitialize: true,
    validateOnBlur: validateOnChange,
    validateOnChange: validateOnChange,
    onSubmit: async (val) => {
      await dispatch(
        loginThunk({
          email: val.email,
          password: val.password,
          userType: val.userType,
        })
      );
    },
    validationSchema: schema,
  });
  const [loading, setLoading] = useState(false);

  const loginError = useSelector((x: RootState) => x.userReducer.loginError);
  const jwt = useSelector((x: RootState) => x.userReducer.jwt);
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);
  const errors = formik.submitCount > 0 ? formik.errors : {};
  return (
    <section
      className="bg-base-200 h-full flex flex-col 
    justify-center items-center 
    bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] 
    bg-center bg-cover"
    >
      <form className="w-[400px] bg-base-100 rounded-lg p-8 shadow-md font-inter">
        <EPinLogo />
        <h1 className="text-2xl font-bold mb-5">Sign in to your account</h1>
        <div className="flex flex-col gap-4">
          <FormControl
            label="Login"
            input={<TextInput {...formik.getFieldProps("email")} />}
            error={errors.email}
          />
          <FormControl
            label="Password"
            input={
              <PasswordInput
                {...formik.getFieldProps("password")}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    setValidateOnChange(true);
                    setLoading(true);
                    await formik.submitForm();
                    setLoading(false);
                  }
                }}
              />
            }
            error={errors.password}
          />

          <div>
            <Button
              content="Login"
              className="w-full"
              disabled={!formik.isValid}
              loadingFromExternal={loading}
              icon={<LoginIcon width={22} height={22} />}
              onClick={async () => {
                await formik.submitForm();
                setValidateOnChange(true);
              }}
            />
          </div>
          <div className="min-h-4">
            {!!loginError && (
              <div className="text-error text-sm opacity-80">
                * {loginError}
              </div>
            )}
          
          </div>
        </div>
        <div>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            register
          </Link>
          .
        </div>
      </form>
    </section>
  );
}
