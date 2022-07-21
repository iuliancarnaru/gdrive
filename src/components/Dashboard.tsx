import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";

export function Dashboard() {
  const { currentUser, logOut } = useAuth();
  const toast = useToast();
  let navigate = useNavigate();

  function handleLogout() {
    try {
      logOut();
      toast({
        title: "Successfully logged out",
        description: "See you next time",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/", { replace: true });
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

  return (
    <Container>
      <Heading mb={5}>Profile</Heading>
      <Box mb={5}>
        <Text mb={5}>
          Email: <strong>{currentUser?.email}</strong>
        </Text>
        <Link to="/update-profile">
          <Button colorScheme="teal" variant="solid">
            Update Profile
          </Button>
        </Link>
      </Box>
      <Box>
        <Link to="/test">Go to test</Link>
      </Box>

      <Button colorScheme="teal" variant="link" onClick={handleLogout}>
        Log out
      </Button>
    </Container>
  );
}
