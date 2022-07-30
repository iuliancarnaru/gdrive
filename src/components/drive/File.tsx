import { AttachmentIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

export function File({
  file,
}: {
  file: {
    createdAt: string;
    folderId: string;
    name: string;
    url: string;
    userId: string;
  };
}) {
  return (
    <a href={file.url} target="_blank">
      <Box
        border="1px solid grey"
        p={3}
        borderRadius={5}
        backgroundColor="grey"
        color="white"
        cursor="pointer"
      >
        <AttachmentIcon mr={5} />
        {file.name}
      </Box>
    </a>
  );
}
