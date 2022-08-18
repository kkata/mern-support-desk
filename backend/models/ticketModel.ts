import mongoosse from "mongoose";

const ticketSchema = new mongoosse.Schema(
  {
    user: {
      type: mongoosse.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "iPad", "MacBook Pro", "iMac"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the problem"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = mongoosse.model("Ticket", ticketSchema);
