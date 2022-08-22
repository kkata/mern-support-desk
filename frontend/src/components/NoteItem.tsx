import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { NoteType } from "../features/notes/noteSlice";
import { AuthType } from "../type";

type PropsType = {
  note: NoteType;
};

export const NoteItem = ({ note }: PropsType) => {
  const { user } = useSelector<RootState, AuthType>((state) => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Note from{" "}
        {note.isStaff ? <span>Staff</span> : <span>{user!.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString()}
      </div>
    </div>
  );
};
