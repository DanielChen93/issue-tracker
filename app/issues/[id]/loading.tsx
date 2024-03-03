import { Flex, Card } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoadingPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton width={"3rem"} />
        <Skeleton width={"5rem"} />
        <Skeleton />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default IssueDetailLoadingPage;
