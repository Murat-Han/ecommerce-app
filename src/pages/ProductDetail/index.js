import React from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";

import { fetchProduct } from "../../api/apiRequests";
import { useCart } from "../../contexts/CartContext";
import "./styles.css";

function ProductDetail() {
  const { addToCart, items } = useCart();
  const { product_id } = useParams();
  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );
  //loading message
  if (isLoading) return <h2>Loading</h2>;

  const productData = data.data;
  const images = [
    "https://images.unsplash.com/photo-1565339119519-c9eaa1918b9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1593642633279-1796119d5482?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  ].map((url) => ({ original: url }));

  if (error) return "An error has occurred: " + error.message;
  //find item in cart
  const findCartItem = items.find((item) => item._id === productData._id);
  return (
    <div className="product-detail">
      <Box
        margin="5"
        width="95%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
         <h2>
        <strong> Category: {productData.category.name}</strong>
      </h2>
      <h2>
        <strong>Product Name:</strong> {productData.title}
      </h2>
      <h3>Added on: {moment(productData.createdAt).format("DD.MM.YYYY")}</h3>
        <ImageGallery
          items={images}
          showBullets={true}
          showIndex={true}
          showPlayButton={false}
        />
        <Button mt={5} colorScheme="pink" onClick={() =>addToCart(productData)}>
         {findCartItem ? "Remove From Cart" :"Add To Cart"}
        </Button>
      </Box>
    </div>
  );
}

export default ProductDetail;
