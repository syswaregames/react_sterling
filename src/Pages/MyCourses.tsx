import { useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { RootState } from "@/Store/Store";

export default function MyCourses() {
  const myCourses = useSelector(
    (root: RootState) => root.coursesReducer.myCourses
  );

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
      <PageTitle>My Courses</PageTitle>
      <article className="pt-5 flex flex-col gap-2">
        {myCourses.map((course) => (
          <div className="flex gap-3">
            <ArticleLink to={`/myCourses/${course.id}`}>
              {course.name}
            </ArticleLink>
            {!course.classes.find((x) => x.percent === 0) && (
              <div className="bg-green-500 text-white rounded-md px-2">
                Completed
              </div>
            )}
          </div>
        ))}
      </article>
    </PageWrapper>
  );

  return index;
}
