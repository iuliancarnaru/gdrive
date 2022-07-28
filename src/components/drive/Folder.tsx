import { AddFolderButton } from "./AddFolderButton";

export interface FolderType {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
  name: string;
  parentId: string | null;
  userId: string;
}

export function Folder({ folder }: { folder: FolderType }) {
  return <div>{folder?.name}</div>;
}
