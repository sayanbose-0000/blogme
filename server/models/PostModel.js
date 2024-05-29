import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    imagePath: {
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
      ref: 'blogme-user'
    },

    date: {
      type: String,
      required: true
    }
  }
)

const PostModel = model('blogme-posts', PostSchema);
export default PostModel;