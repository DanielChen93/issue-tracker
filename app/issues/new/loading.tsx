import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height={"20rem"} />
    </div>
  );
};

export default NewIssueLoadingPage;
