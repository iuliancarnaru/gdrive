import { useEffect, useReducer } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../auth/firebase";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
};

const ROOT_FOLDER = {
  name: "Root",
  id: null,
  path: [],
};

function reducer(state, { type, payload }) {
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
    childFolder: [],
    childFiles: [],
  });

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

  return state;
}
