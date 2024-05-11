import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      require: true
    },

    summary: {
      type: String,
      require: true
    },

    content: {
      type: String,
      require: true
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'blogme-users'
    }
  }
)