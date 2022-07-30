import { Box, Flex } from "@chakra-ui/react";
import { useFolder } from "../../hooks/useFolder";
import { AddFolderButton } from "./AddFolderButton";
import { Navbar } from "./Navbar";
import { Folder } from "./Folder";
import { FolderType } from "./Folder";
import { useParams } from "react-router-dom";
import { FolderBreadcrumbs } from "./FolderBreadCrumbs";
import { AddFileButton } from "./AddFileButton";
import { File } from "./File";

export function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);

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
              <Folder key={child.id} folder={child} />
            ))}
          </>
        )}
      </Flex>
      {childFolders.length > 0 && childFiles.length > 0 && <hr />}
      <Flex p={5}>
        {childFiles.length > 0 && (
          <>
            {childFiles?.map((child) => {
              console.log(child);

              return <File file={child} />;
            })}
          </>
        )}
      </Flex>
    </>
  );
}
