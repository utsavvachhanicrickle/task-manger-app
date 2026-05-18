import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    query: { type: String, required: true },
    response: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AIChatModel = mongoose.model("AIChat", aiChatSchema);

export default AIChatModel;