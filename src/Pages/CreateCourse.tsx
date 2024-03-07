import { useDispatch, useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { AppDispatch, RootState } from "@/Store/Store";
import { ICourse, addCourse, updateCourse } from "@/Store/Slices/CoursesSlice";
import { useParams } from "react-router-dom";
import FormControl from "@/UIKit/FormControl";
import TextInput from "@/UIKit/TextInput";
import { useFormik } from "formik";
import Button from "@/UIKit/Button";
import { produce } from "immer";
import { useMemo } from "react";
import { CourseEditor } from "./EditCourse";

export default function CreateCourse() {
const course = useMemo(()=> {
  const newCourse: ICourse= {
    classes: [],
    id: 0,
    name: "New course",
  };
  return newCourse;
}, [])
  return (
    <PageWrapper>
      <Breadcrumbs
        className="mb-4"
        path={[
          {
            label: "Manage Courses",
            linkTo: "/manageCourses",
          },
          {
            label: "Create course",
          },
        ]}
      />
      <PageTitle>Create course</PageTitle>
      {course && <CourseEditor initialValues={course} />}
    </PageWrapper>
  );
}
