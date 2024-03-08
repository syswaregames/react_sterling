import { useDispatch, useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { AppDispatch, RootState } from "@/Store/Store";
import Button from "@/UIKit/Button";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "@/Store/Slices/CoursesSlice";

export default function ManageCourses() {
  const myCourses = useSelector(
    (root: RootState) => root.coursesReducer.myCourses
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const index = (
    <PageWrapper>
      <Breadcrumbs
        className="mb-4"
        path={[
          {
            label: "My Courses",
          },
        ]}
      />
      <PageTitle>Manage Courses</PageTitle>
      <article className="pt-5 flex flex-col gap-2 max-w-[600px]">
        {myCourses.map((course) => (
          <div className="flex gap-2 items-center bg-gray-100 py-2 px-2">
            {course.name}
            <div className="flex-grow"></div>
            <div className="flex gap-2">
              <Button
                content="Edit"
                onClick={() => {
                  navigate("/ManageCourses/Edit/" + course.id);
                }}
              />
              <Button
                content="Delete"
                onClick={() => {
                  dispatch(deleteCourse({ courseId: course.id }));
                }}
              />
            </div>
          </div>
        ))}
        <div>
          <Button
            content="Create"
            onClick={() => {
              navigate("/ManageCourses/Create");
            }}
          />
        </div>
      </article>
    </PageWrapper>
  );

  return index;
}
