import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";

export function Navbar() {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="orange"
      p={5}
      mb={5}
    >
      <Box>
        <Link as={RouterLink} to="/">
          GDRIVE
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to="/profile">
          PROFILE
        </Link>
      </Box>
    </Flex>
  );
}
