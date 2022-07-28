import { Box } from "@chakra-ui/react";
import { useFolder } from "../../hooks/useFolder";
import { AddFolderButton } from "./AddFolderButton";
import { Navbar } from "./Navbar";
import { Folder } from "./Folder";
import { FolderType } from "./Folder";

export function Dashboard() {
  const { folder, childFolders } = useFolder("pOku3PcaDN1dUck6aM4d");

  return (
    <>
      <Navbar />
      <Box p={5}>
        <AddFolderButton currentFolder={folder} />
        {childFolders.length > 0 && (
          <div>
            {childFolders?.map((child: FolderType) => (
              <Folder folder={child} />
            ))}
          </div>
        )}
      </Box>
    </>
  );
}
