import {
  Box,
  Container,
  Text,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/react";

import { useRef } from "react";

export function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  return (
    <Container mt={10}>
      <Heading mb={6} textAlign="center">
        Sign up
      </Heading>
      <Box borderRadius={10} borderWidth="1px" p={7} mb={5}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" ref={emailRef} required />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" ref={passwordRef} required />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <Input
            id="confirm-password"
            type="password"
            ref={passwordConfirmRef}
            required
          />
        </FormControl>
        <Button type="submit" isLoading={false} colorScheme="blue">
          Sign up
        </Button>
      </Box>
      <Text align="center">Already have an account? Log In</Text>
    </Container>
  );
}
