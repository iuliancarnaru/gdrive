import { Box, Flex } from "@chakra-ui/react";
import { useFolder } from "../../hooks/useFolder";
import { AddFolderButton } from "./AddFolderButton";
import { Navbar } from "./Navbar";
import { Folder } from "./Folder";
import { FolderType } from "./Folder";
import { useParams } from "react-router-dom";
import { FolderBreadcrumbs } from "./FolderBreadCrumbs";
import { AddFileButton } from "./AddFileButton";

export function Dashboard() {
  const { folderId } = useParams();
  const {
    folder,
    childFolders,
  }: { folder: FolderType; childFolders: FolderType[] } = useFolder(folderId);

  return (
    <>
      <Navbar />
      <Box p={5}>
        <FolderBreadcrumbs currentFolder={folder} />
      </Box>
      <Flex p={5}>
        <AddFolderButton currentFolder={folder} />
        <AddFileButton currentFolder={folder} />
      </Flex>
      <Flex p={5}>
        {childFolders.length > 0 && (
          <>
            {childFolders?.map((child: FolderType) => (
              <Folder folder={child} />
            ))}
          </>
        )}
      </Flex>
    </>
  );
}
