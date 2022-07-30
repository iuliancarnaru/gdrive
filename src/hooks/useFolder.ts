import { useEffect, useReducer } from "react";
import {
  getDoc,
  doc,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { useAuth } from "../contexts/authContext";
import { FolderType } from "../components/drive/Folder";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
};

// @ts-ignore
function reducer(
  state: {
    folderId: string;
    folder: string;
    childFolders: FolderType[];
    childFiles: {
      createdAt: string;
      folderId: string;
      name: string;
      url: string;
      userId: string;
    }[];
  },
  { type, payload }
) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(
  folderId: string | null = null,
  folder: string | null = null
) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  const { user } = useAuth();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    (async () => {
      try {
        // Get a document
        const docRef = doc(db, "folders", folderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const formattedDoc = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: formattedDoc },
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      }
    })();
  }, [folderId]);

  useEffect(() => {
    const q = query(
      collection(db, "folders"),
      where("parentId", "==", folderId),
      where("userId", "==", user?.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const childFolders: { id: string }[] = [];

      querySnapshot.forEach((doc) => {
        const formattedDoc = {
          id: doc.id,
          ...doc.data(),
        };

        childFolders.push(formattedDoc);
      });

      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolders,
        },
      });
    });

    return () => unsubscribe();
  }, [folderId, user]);

  useEffect(() => {
    const q = query(
      collection(db, "files"),
      where("folderId", "==", folderId),
      where("userId", "==", user?.uid),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const childFiles: {
        createdAt: string;
        folderId: string;
        name: string;
        url: string;
        userId: string;
      }[] = [];

      querySnapshot.forEach((doc) => {
        const formattedDoc = {
          id: doc.id,
          ...doc.data(),
        };

        //@ts-ignore
        childFiles.push(formattedDoc);
      });

      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {
          childFiles,
        },
      });
    });

    return () => unsubscribe();
  }, [folderId, user]);

  return state;
}
