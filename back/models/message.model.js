const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    userName: String,
    text: String,
    sockedId: String,
  },
  { timestamps: true, versionKey: false }
);

const Message = model("message", messageSchema);

module.exports = Message;
