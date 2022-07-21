import {
  Box,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react";

import { Formik, Form, Field, FieldProps } from "formik";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/authContext";

export function Login() {
  const { logInWithEmailAndPassword } = useAuth();
  const toast = useToast();
  let location = useLocation();
  let navigate = useNavigate();

  //@ts-ignore
  let from = location.state?.from?.pathname || "/";

  async function handleSubmit({ email, password }: FormValues) {
    try {
      await logInWithEmailAndPassword(email, password);
      toast({
        title: "Welcome back!",
        description: "We've missed you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      navigate(from, { replace: true });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Ups! Something went wrong!",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  interface FormValues {
    email: string;
    password: string;
  }

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return (
    <Container mt={10}>
      <Heading mb={10} textAlign="center">
        Login
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box borderWidth="1px" borderRadius={10} p={10}>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl mb={5}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email" required />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <FormControl mb={5}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="email"
                      required
                    />
                  </FormControl>
                )}
              </Field>
              <Button
                isLoading={isSubmitting}
                loadingText="Submitting"
                colorScheme="blue"
                variant="solid"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Text mt={5} align="center">
        Need an account?{" "}
        <Link as={RouterLink} to="/signup">
          Sign up.
        </Link>
      </Text>
    </Container>
  );
}
