import { useDispatch, useSelector } from "react-redux";
import ArticleLink from "../Components/ArticleLink";
import Breadcrumbs from "../Components/Breadcrumbs";
import PageTitle from "../Components/PageTitle";
import PageWrapper from "../Components/PageWrapper";
import { AppDispatch, RootState } from "@/Store/Store";
import { ICourse, setClassProgressPercent } from "@/Store/Slices/CoursesSlice";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/UIKit/Button";
import { useEffect, useState } from "react";

export default function Class_() {
  const params = useParams();
  const courseId = parseInt(params.id ?? "-1");
  const classId = parseInt(params.idClass ?? "-1");
  const myCourse = useSelector((root: RootState) =>
    root.coursesReducer.myCourses.find((x) => x.id === courseId)
  );
  const classes = myCourse?.classes;
  const class_ = classes?.find((x) => x.id === classId);
  const navigate = useNavigate();
  const currentClassPercent = useSelector(
    (root: RootState) =>
      root.coursesReducer.myCourses
        .find((x) => x.id === courseId)
        ?.classes.find((x) => x.id === classId)?.percent
  );
  const dispatch: AppDispatch = useDispatch();
  let link = class_!.link;
  var splitedLink = class_!.link.split("?");

  if (splitedLink.length === 2) {
    var searchParams = new URLSearchParams(splitedLink[1]);
    var v = searchParams.get("v") ?? "";
    link = `https://www.youtube.com/embed/${v}`;
  }

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
            linkTo: "/myCourses/" + myCourse?.id,
          },
          {
            label: class_?.name ?? "",
          },
        ]}
      />
      <PageTitle>{class_?.name}</PageTitle>
      <div className="max-w-[600px]">
        <iframe
          className="mt-10 w-full"
          width="560"
          height="315"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="flex justify-between">
          <Button
            content="Return"
            className="mt-5"
            onClick={() => {
              navigate(`/myCourses/${courseId}`);
            }}
          />
          <div className="flex gap-2">
            <Button
              content="Mark as viewed"
              className="mt-5"
              disabled={class_!.percent === 1}
              onClick={() => {
                dispatch(
                  setClassProgressPercent({ classId, courseId, percent: 1 })
                );
              }}
            />
            <Button
              content="Unmark as viewed"
              className="mt-5"
              disabled={class_?.percent === 0}
              onClick={() => {
                dispatch(
                  setClassProgressPercent({ classId, courseId, percent: 0 })
                );
              }}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
