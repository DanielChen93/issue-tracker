"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    console.log(params.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex gap="2" align="center">
      Page {currentPage} of {pageCount}
      <Button
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
      >
        <ArrowRightIcon />
      </Button>
      <Button
        onClick={() => changePage(pageCount)}
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
