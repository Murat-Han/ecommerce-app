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
import { QueryClient, useMutation } from "react-query";

import { postProduct } from "../../../api/apiRequests";
import validationSchema from "./validations";

function NewProduct() {
  const queryClient = QueryClient();


  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Creating product", key: "product_create" });
    const newValues={
        ...values,
        photos:JSON.stringify(values.photos),
    }
    
    newProductMutation.mutate(values, {
        onSuccess: () => {
          console.log("Creating Product Success");
        },
      });
    try {
      await postProduct(values);
      message.success({
        content: "Product created successfully",
        key: "product_create",
        duration: 2,
      });
    } catch (e) {
      message.error({
        content: "Error occurred while adding new product",
        key: "product_create",
        duration: 2,
      });
    }
  };

  return (
    <div>
      <Box p="5" display="flex" justifyContent="center" flexDirection="column">
        <Text fontSize="2xl">Add New Product</Text>
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: 0,
            images: [],
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
                  <form onSubmit={handleSubmit} width="100%">
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
                        <Text color="red" mt={2}>
                          {errors.title}
                        </Text>
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
                        <Text color="red" mt={2}>
                          {errors.description}
                        </Text>
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
                        <Text color="red" mt={2}>
                          {errors.price}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Image URLs</FormLabel>
                      <FieldArray
                        name="images"
                        render={(arrayHelpers) => (
                          <div>
                            {values.images &&
                              values.images.map((image, index) => (
                                <div key={index}>
                                  <Input
                                    name={`image.${index}`}
                                    value={image}
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
                            <Button
                              mt="5"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add Image
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
                      Create
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default NewProduct;
