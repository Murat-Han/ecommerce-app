import React, { useState } from "react";

import { BsFillCartDashFill, BsFillCartCheckFill } from "react-icons/bs";

import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import {
  Alert,
  Text,
  Textarea,
  Box,
  FormLabel,
  FormControl,
  Image,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import GoBackButton from "../../components/GoBackButton";
import {postOrder} from "../../api/apiRequests";

function Cart() {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { items, removeFromCart,emptyCart } = useCart();

  const initialRef = React.useRef(null);

  const totalPrice = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleOrderSubmit = async () => {
    const cartItemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(cartItemIds),
    };
    await postOrder(input);
    emptyCart();
    onClose();
  };

  return (
    <div>
      {items.length < 1 ? (
        <>
          <Box m={5}>
            <Alert status="warning">Cart is Empty</Alert>
            <GoBackButton />
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="row"
            flexWrap="wrap"
            m={2}
          >
            {items.map((item) => (
              <SimpleGrid
                p="5"
                key={item._id}
                minChildWidth="290px"
                width="320px"
                spacing="20px"
              >
                <Box textAlign="center">
                  <Link to={`/products/${item.slug}`}>
                    <Box height="50px">Product Name: {item.title}</Box>
                    <Image
                      width="100%"
                      mt={1}
                      src="https://picsum.photos/400/300"
                      alt="product"
                      loading="lazy"
                    />
                    <Text fontWeight="bold" mt={1}>
                      Price:{` ${item.price} TL`}
                    </Text>
                  </Link>
                  <Button
                    colorScheme="red"
                    mt={2}
                    onClick={() => removeFromCart(item._id)}
                    leftIcon={<BsFillCartDashFill />}
                  >
                    Remove From Cart
                  </Button>
                </Box>
              </SimpleGrid>
            ))}
          </Box>
          <hr />
          <Box
            m={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text
              mt={2}
              fontSize={20}
              fontWeight="bold"
              bgColor="#eeeee4"
              width="100%"
            >
              Total Price:{` ${totalPrice} TL`}
            </Text>
            <Button
              mt={2}
              colorScheme="orange"
              onClick={onOpen}
              leftIcon={<BsFillCartCheckFill />}
            >
              Order{` ( ${items.length} )`}
            </Button>
            {/* ORDER MODAL FROM HERE */}
            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={handleOrderSubmit}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Complete Order</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea
                      ref={initialRef}
                      placeholder="Enter order address..."
                      onChange={(e)=>setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="orange" mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </>
      )}
    </div>
  );
}

export default Cart;
