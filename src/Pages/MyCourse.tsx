import { useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { RootState } from "@/Store/Store";
import { ICourse } from "@/Store/Slices/CoursesSlice";
import { useParams } from "react-router-dom";

export default function MyCourse() {
  const myCourses = useSelector(
    (root: RootState) => root.coursesReducer.myCourses
  );
  const params = useParams();
  const id = parseInt(params.id ?? "-1");
  const myCourse = useSelector((root: RootState) =>
    root.coursesReducer.myCourses.find((x) => x.id === id)
  );
  const classes = myCourse?.classes;
  return (
    <PageWrapper>
      <Breadcrumbs
        className="mb-4"
        path={[
          {
            label: "My Courses",
            linkTo: "/myCourses",
          },
          {
            label: myCourse?.name ?? "",
          },
        ]}
      />
      <PageTitle>{myCourse?.name}</PageTitle>
      <article className="pt-5 flex flex-col gap-2">
        {classes?.map((class_) => (
          <div className="flex gap-2">
            <ArticleLink to={`/myCourses/${myCourse?.id}/class/${class_.id}`}>
              {class_?.name}
            </ArticleLink>
            {class_.percent===1 && <div className="rounded-lg bg-green-500 px-2 text-white">Completed</div>}
          </div>
        ))}
      </article>
    </PageWrapper>
  );
}
