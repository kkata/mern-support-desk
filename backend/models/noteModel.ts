import mongoosse from "mongoose";

const noteSchema = new mongoosse.Schema(
  {
    user: {
      type: mongoosse.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoosse.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoosse.model("Note", noteSchema);
