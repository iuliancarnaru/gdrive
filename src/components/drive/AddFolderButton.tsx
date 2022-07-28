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
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useAuth } from "../../contexts/authContext";
import { FolderType } from "./Folder";

export function AddFolderButton({
  currentFolder,
}: {
  currentFolder: FolderType;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const handleSubmit = async (folderName: string) => {
    console.log("called");

    if (currentFolder === null) return;

    try {
      const docRef = await addDoc(collection(db, "folders"), {
        name: folderName,
        parentId: currentFolder.id,
        userId: user?.uid,
        // path,
        createdAt: serverTimestamp(),
      });
      onClose();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
