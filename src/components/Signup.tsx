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
} from "@chakra-ui/react";

import { useState } from "react";

import { Formik, Form, Field, FieldProps } from "formik";

import { useAuth } from "../contexts/authContext";

export function SignUp() {
  const { signup } = useAuth();
  const toast = useToast();

  async function handleSubmit({ email, password }: FormValues) {
    try {
      await signup(email, password);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Ups! Something went wrong!",
        description: error.message,
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
    confirmPassword: string;
  }

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Container mt={10}>
      <Heading mb={10} textAlign="center">
        Sign up
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box borderWidth="1px" borderRadius={10} p={10}>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <FormControl mb={5}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="email" />
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <FormControl mb={5}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" placeholder="email" />
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field }: FieldProps) => (
                  <FormControl mb={10}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input {...field} type="password" placeholder="email" />
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
    </Container>
  );
}