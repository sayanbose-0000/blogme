import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    image: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    summary: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'blogme-users'
    },

    date: {
      type: String,
      required: true
    },

    likes: {
      type: Number,
      required: true
    }
  }
)