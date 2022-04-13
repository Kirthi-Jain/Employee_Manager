const { Schema, model } = require("mongoose"),
  UserSchema = new Schema(
    {
      email: {
        type: String,
        unique: true,
        required: "Email is required!!",
        match:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
      name: {
        type: String
      },
      date: {
        type: String
      },
      address: { type: String },
      photoURL: {
        type: String
      },
    },
    { timestamps: true }
  );
exports = model("User", UserSchema);
