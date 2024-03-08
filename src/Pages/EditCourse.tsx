import { useDispatch, useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { AppDispatch, RootState } from "@/Store/Store";
import { ICourse, addCourse, updateCourse } from "@/Store/Slices/CoursesSlice";
import { useNavigate, useParams } from "react-router-dom";
import FormControl from "@/UIKit/FormControl";
import TextInput from "@/UIKit/TextInput";
import { useFormik } from "formik";
import Button from "@/UIKit/Button";
import { produce } from "immer";
import { error } from "console";

export default function EditCourse() {
  const params = useParams();
  const id = parseInt(params.id ?? "-1");
  const myCourse = useSelector((root: RootState) =>
    root.coursesReducer.myCourses.find((x) => x.id === id)
  );

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
      <PageTitle>Edit course</PageTitle>
      {myCourse && <CourseEditor initialValues={myCourse} />}
    </PageWrapper>
  );
}

export function CourseEditor({ initialValues }: { initialValues: ICourse }) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik<ICourse>({
    initialValues: initialValues,
    validateOnChange: true,
    onSubmit: (values) => {
      if (values.id === 0) {
        dispatch(addCourse({ course: formik.values }));
      } else {
        dispatch(updateCourse({ course: formik.values }));
      }
      navigate("/ManageCourses");
    },
    validate(values) {
      const errors: any = {};
      if (
        values.classes.find((x) => !x.link.includes("https://www.youtube.com"))
      ) {
        errors.link = "Incorrect youtube video link";
      }
      return errors;
    },
  });

  return (
    <article className="pt-5 flex flex-col gap-2 max-w-[600px]">
      <FormControl
        label="Name"
        input={<TextInput {...formik.getFieldProps("name")} />}
        error={formik.errors.name}
      />
      <FormControl
        label="Classes"
        input={
          <div className="p-5 border bg-base-200 rounded-md flex flex-col gap-5">
            {formik.values.classes.map((x, i) => {
              return (
                <div className="border p-3 bg-base-100">
                  <FormControl
                    label="Name"
                    input={
                      <TextInput
                        value={x.name}
                        setValue={(value) => {
                          formik.setValues(
                            produce(formik.values, (draft) => {
                              draft.classes[i].name = value;
                            })
                          );
                        }}
                      />
                    }
                  />
                  <FormControl
                    label="Link"
                    input={
                      <TextInput
                        value={x.link}
                        className={cx("", {
                          "border-red-500 outline-red-500 border-2":
                            !x.link.includes("https://www.youtube.com"),
                        })}
                        setValue={(value) => {
                          formik.setValues(
                            produce(formik.values, (draft) => {
                              draft.classes[i].link = value;
                            })
                          );
                        }}
                      />
                    }
                  />
                  <FormControl
                    label="Description"
                    input={
                      <TextInput
                        value={x.description ?? ""}
                        setValue={(value) => {
                          formik.setValues(
                            produce(formik.values, (draft) => {
                              draft.classes[i].description = value;
                            })
                          );
                        }}
                      />
                    }
                  />
                  <div className="text-right mt-5">
                    <Button
                      content="Remove"
                      onClick={() => {
                        formik.setValues(
                          produce(formik.values, (draft) => {
                            draft.classes.splice(
                              i,
                              1
                            );
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center mt-5">
              <Button
                content="Add"
                onClick={() => {
                  formik.setValues(
                    produce(formik.values, (draft) => {
                      draft.classes.push({
                        id: 0,
                        name: "New Class",
                        link: "",
                        percent: 0,
                        type: "youtube",
                      });
                    })
                  );
                }}
              />
            </div>
          </div>
        }
        error={formik.errors.name}
      />

      <Button
        disabled={Object.keys(formik.errors).length > 0}
        content={formik.values.id === 0 ? "Create course" : "Save course"}
        onClick={() => formik.submitForm()}
      />
    </article>
  );
}
