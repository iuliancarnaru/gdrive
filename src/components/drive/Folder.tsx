import { EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface FolderType {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  name: string;
  parentId: string | null;
  userId: string;
  path: { name: string; id: string }[];
}

export function Folder({ folder }: { folder: FolderType }) {
  return (
    <Link to={`/folder/${folder.id}`}>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="teal"
        variant="outline"
        w={150}
        overflow="hidden"
        noOfLines={1}
        mr={2}
      >
        {folder.name}
      </Button>
    </Link>
  );
}
