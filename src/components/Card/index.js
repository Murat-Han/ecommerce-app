import React from "react";
import moment from "moment";

import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BsCartPlusFill,BsFillCartDashFill } from "react-icons/bs";

import { useCart } from "../../contexts/CartContext";

function Card({ product }) {
  const { addToCart, items } = useCart();
  console.log("Card", product);

  //find item in cart
  const findCartItem = items.find((item) => item._id === product._id);
  return (
    <Box
      ml={1}
      mr={1}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      maxH="content"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Link to={`/products/${product.slug}`}>
        <Image
          src="https://picsum.photos/400/300"
          alt="product"
          loading="lazy"
        />
        <Box p="3">
          <Box d="flex" alignItems="baseline">
            Added on: {moment(product.createdAt).format("DD.MM.YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            Product name:{` ${product.title[0].toUpperCase()}${product.title.slice(1)}.`}
          </Box>
          <Box>
            <strong>Price:</strong> {`${product.price} $`}
          </Box>
        </Box>
      </Link>
      <Button
        colorScheme={findCartItem ? "red" : "pink"}
        width="80%"
        onClick={() => addToCart(product, findCartItem)}
        leftIcon={findCartItem ?<BsFillCartDashFill/> :<BsCartPlusFill/>} 
      >
        {findCartItem ? "Remove From Cart" : "Add To Cart"}
      </Button>
    </Box>
  );
}

export default Card;
