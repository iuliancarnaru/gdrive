import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RootFolderType, ROOT_FOLDER } from "../../hooks/useFolder";

export function FolderBreadcrumbs({
  currentFolder,
}: {
  currentFolder: RootFolderType;
}) {
  console.log(currentFolder);

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }

  return (
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {path.map((folder, index) => (
        <BreadcrumbItem key={folder.id}>
          <BreadcrumbLink
            as={Link}
            to={folder.id ? `/folder/${folder.id}` : `/`}
          >
            {folder.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
      {currentFolder && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to="#">
            {currentFolder.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}
