import mongoose, { Schema } from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

 const Email = mongoose.model("Email", emailSchema);
 
 export default Email
