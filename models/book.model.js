const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = Schema(
  { 
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "Title requires at least 3 chars"],
      maxLength: [20, "Title cannot be more than 20 chars"]
    },
    abstract: {
      type: String,

    },
    isbn: {
      type: String,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Author"
    },
    publishedAt: {
      type: Date,
      validate: {
        validator: function (value){
          return value <= new Date()
        },
        message: "due Date must be today or on an earlier date"
      }
    },
    coverUrl: {
      type: String,
    },
    genres: [{
      type: String,
      enum: ['Fantasy', 'Science Fiction', 'Poetry', 'Historical', 'Biography', 'Other']
    }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      }
    }
  }
)

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
