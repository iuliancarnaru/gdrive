import { Box } from "@chakra-ui/react";
import { useFolder } from "../../hooks/useFolder";
import { AddFolderButton } from "./AddFolderButton";
import { Navbar } from "./Navbar";

export function Dashboard() {
  const { folder } = useFolder("ncypS1ezi9D5xM1CNe5n");
  console.log(folder);

  return (
    <>
      <Navbar />
      <Box p={5}>
        <AddFolderButton currentFolder={folder} />
      </Box>
    </>
  );
}
