import Skeleton from "@/app/components/Skeleton";
import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height={"2rem"} />
      <Skeleton height={"20rem"} />
    </div>
  );
};

export default IssueFormSkeleton;
