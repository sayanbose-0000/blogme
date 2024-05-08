import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    }
  }
)

const UserModel = model('blogme-user', UserSchema);
export default UserModel;