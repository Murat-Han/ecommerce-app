import {
  Flex,
  Button,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Alert,
  Checkbox,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationShema from "./validations";
import { postRegister } from "../../../api/apiRequests";
import { useAuth } from "../../../contexts/AuthContext";
import './styles.css'

function Signup({ history }) {
  const { handleLogin } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms:false
    },
    validationSchema: validationShema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await postRegister({
          email: values.email,
          password: values.password,
        });
        console.log(registerResponse);
        handleLogin(registerResponse);
        history.push("/profile");
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={5}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={()=>formik.handleSubmit} className="form" >
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={formik.handleSubmit}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Password</FormLabel>
                <Input
                 placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleSubmit}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              <FormControl mt={2}>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  placeholder="Password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleSubmit}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
              </FormControl>
              <FormControl mt={3}>
                <Checkbox
                colorScheme="blue"
                  id="terms"
                  name="terms"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.terms}
                  isInvalid={formik.touched.terms && formik.errors.terms}
                  defaultChecked
                >I accept Terms and Conditions</Checkbox>
              </FormControl>
              <Button colorScheme="blue" mt={3} type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
