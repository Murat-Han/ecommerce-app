import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import { message } from "antd";
import { fetchProduct, updateProduct } from "../../../api/apiRequests";
import validationSchema from "./validations";

function ProductUpdate() {
  const { productId } = useParams();
  const { isLoading, isError, error, data } = useQuery(
    ["admin:products", productId],
    () => fetchProduct(productId)
  );
  console.log("Product Update", data);
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Updating product", key: "product_update" });
    try {
      await updateProduct(values, productId);
      message.success({
        content: "Product updated successfully",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error({
        content: "Error occurred while updating product",
        key: "product_update",
        duration: 2,
      })
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error{error.message}</div>;
  }

  return (
    <div>
      <Text fontSize="2xl">Update Product</Text>
      <Formik
        initialValues={{
          title: data.data.title,
          description: data.data.description,
          price: data.data.price,
          photos: data.data.photo,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my={5} textAlign="left" width="60%">
                <form onSubmit={handleSubmit}>
                  <FormControl mt={2}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color="red">{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color="red">{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      type="number"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color="red">{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={2}>
                    <FormLabel>Image URLs</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Input
                                  name={`photo.${index}`}
                                  value={photo}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled={isSubmitting}
                                  width="xl"
                                />
                                <Button
                                  ml={4}
                                  colorScheme="red"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          <Button mt="5" onClick={() => arrayHelpers.push("")}>
                            Add Photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ProductUpdate;
