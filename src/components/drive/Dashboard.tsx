import { Box } from "@chakra-ui/react";
import { AddFolderButton } from "./AddFolderButton";
import { Navbar } from "./Navbar";

export function Dashboard() {
  return (
    <>
      <Navbar />
      <Box p={5}>
        <AddFolderButton />
      </Box>
    </>
  );
}
