import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists"],
    required: [true, "Email is required to field!"]
  },
  username: {
    type: String,
    required: [true, "Username is required to field!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  Image: {
    type: String
  }
});

const User = models.User || model("User", UserSchema);

export default User;