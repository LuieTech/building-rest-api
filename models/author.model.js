const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Author name is required",
      minLength: [2, "Author's name requires min 2 chars"],
      maxLength: [20, "Author's name requires max 20 chars"]
    },
    bio: {
      type: String,
      trim: true,
      // minLength: [3, "Biography needs at least 3 chars"],
      maxLength: [1000, "Biography is max 1000 chars"],
    },
    century: {
      type: Number, 
      max: [21, "cannot be later than 21st century"] 
    },
    genres: [{
      type: String,
      enum: ['Fantasy', 'Science Fiction', 'Poetry', 'Historical', 'Biography', 'Other']
    }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

        return ret;
      }
    }
  }
)

const Author = mongoose.model("Author", authorSchema)

module.exports = Author