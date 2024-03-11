import Prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: IssueFormSkeleton,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await Prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
