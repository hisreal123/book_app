const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    // required: true,
  },
  stars: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    // required: true
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: Array,
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book
