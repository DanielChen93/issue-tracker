import { Skeleton } from "@/app/components";

const NewIssueLoadingPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height={"20rem"} />
    </div>
  );
};

export default NewIssueLoadingPage;
