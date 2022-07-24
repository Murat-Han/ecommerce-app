import React from "react";

import { SimpleGrid, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";

import Card from "../../components/Card";
import { fetchProducts } from "../../api/apiRequests";
import Skeleton from "../../components/Skeleton";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProducts, {
    getNextPageParam: (lastPage, pages) => lastPage.metadata.nextPage,
  });

  if (status === "loading")
    return (
      <div>
        <Skeleton />
      </div>
    );
  if (status === "error") return "An error has occurred: " + error.message;
  return (
    <div>
      <SimpleGrid minChildWidth="290px" spacing="20px">
        {data.pages.map((group, i) => (
          <React.Fragment key={Math.random() * Date.now()}>
            {group.data.map((product) => (
              <Card key={Math.random() * Date.now()} product={product} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      <div className="load-more-button">
        <Button
          colorScheme="blue"
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          loadingText='Loading...'
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </div>
    </div>
  );
}

export default Products;
