require('dotenv').config()
const cors = require('cors') // help frontend reach backend
const express = require('express')
const reload = require('reload')
const multer = require('multer')
// const bodyParser = require('body-parser')
const path = require('path')
// const fs = require('fs')
const mongoose = require('mongoose')
const connectDB = require('./connectDB')
const Book = require('./models/Books')

const PORT = process.env.PORT || 8000
const app = express()
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 204,
  })
)

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use('uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.json('Hello World !!! lorem   ssss')
})

// getting books
app.get('/api/books', async (req, res) => {
  try {
    const category = req.query.category
    const filter = {}
    if (category) {
      filter.category = category
    }
    const data = await Book.find(filter)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'An error ocurred while fetching books.' })
  }
})

// getting books by id or slug
app.get('/api/books/:slug', async (req, res) => {
  try {
    const slugParam = req.params.slug
    const data = await Book.findOne({ slug: slugParam })

    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'Book not found' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occured while fetching book by slug .' })
  }
})

// SET_STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

var upload = multer({ storage: storage })

// Add new book to database
app.post('/api/books', upload.single('thumbnail'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    if (!req.body.title || !req.body.slug) {
      return res
        .status(400)
        .json({ error: 'Title and slug are required fields' })
    }

    if (req.file.filename) {
      const newBook = new Book({
        title: req.body.title,
        slug: req.body.slug,
        stars: req.body.stars || 0,
        description: req.body.description || '',
        category: req.body.category || '',
        thumbnail: req.file.filename,
      })
      const validateError = newBook.validateSync()
      if (validateError) {
        console.error('Validation error:', validateError)
        return res
          .status(400)
          .json({ error: 'Invalid book data. Please check the input.' })
      }

      await Book.create(newBook)
        .then((res) => {
          console.log('Mongo results', res)
        })
        .catch((err) => {
          console.log(err)
        })

      res.json('Data submitted')
    }

    // Validate the new book object
  } catch (error) {
    console.error('Error adding new book:', error) // Log the actual error
    res
      .status(500)
      .json({ error: 'An error occurred while adding a new book.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

connectDB()

reload(app)
