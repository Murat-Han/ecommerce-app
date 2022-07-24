
import { useNavigate} from "react-router-dom";
import {
  Flex,
  Button,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationShema from "./validations";
import { postLogin } from "../../../api/apiRequests";
import { useAuth } from "../../../contexts/AuthContext";

import './styles.css'

function SignIn() {
  const { handleLogin } = useAuth();
  const history= useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationShema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await postLogin({
          email: values.email,
          password: values.password,
        });
        console.log(loginResponse);
        handleLogin(loginResponse);
        history.push("/profile");
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign In</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit} className="signin-form">
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              <Button colorScheme="blue" mt={4} type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignIn;
