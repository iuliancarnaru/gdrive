import {
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Field, FieldProps, Form, Formik } from "formik";

export function AddFolderButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = (folderName: string) => {
    setTimeout(() => {
      console.log(folderName);
    }, 5000);
  };

  return (
    <>
      <Tooltip label="Add folder" aria-label="Add folder">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Send email"
          icon={<AddIcon />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your folder</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ folderName: "" }}
            onSubmit={(values, actions) => {
              handleSubmit(values.folderName);
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <Field name="folderName">
                    {({ field }: FieldProps) => (
                      <FormControl mb={5}>
                        <Input {...field} placeholder="Folder Name" required />
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    mr={3}
                    isLoading={isSubmitting}
                    loadingText="Adding folder"
                    type="submit"
                  >
                    Add folder
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
