import { CopyIcon } from "@chakra-ui/icons";
import { Tooltip, Input } from "@chakra-ui/react";
import React from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../auth/firebase";
import { useAuth } from "../../contexts/authContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "../../auth/firebase";

//@ts-ignore
export function AddFileButton({ currentFolder }) {
  const { user } = useAuth();
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    if (currentFolder === null || file === null) return;

    const previousPath = currentFolder.path
      .map((path: { id: string; name: string }) => path.name)
      .join("/");

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${previousPath}/${file.name}`
        : `${previousPath}/${currentFolder.name}/${file.name}`;

    const uploadTask = uploadBytesResumable(
      ref(storage, `/files/${user?.uid}/${filePath}`),
      file
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = await addDoc(collection(db, "files"), {
            url: downloadURL,
            name: file.name,
            userId: user?.uid,
            folderId: currentFolder.id,
            createdAt: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        });
      }
    );
  }

  return (
    <>
      <Tooltip label="Add file" aria-label="Add file">
        <label
          htmlFor="file-input"
          style={{
            display: "flex",
            border: "1px solid black",
            width: "40px",
            borderRadius: "5px",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CopyIcon />
          <Input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </label>
      </Tooltip>
    </>
  );
}
