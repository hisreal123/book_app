'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const baseURL = 'http://localhost:8000/api/books'
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [stars, setStars] = useState(0)
  const [thumbnail, setThumbnail] = useState('')
  const [category, setCategory] = useState([])

  const createBook = async (e) => {
    e.preventDefault()

    console.log([title, slug, description, category])

    // const formData = {
    //   title: title,
    //   slug: slug,
    //   description: description,
    //   category: category.join(','),
    //   thumbnail: thumbnail,
    //   stars: stars,
    // }

    const formData = new FormData() // Create a FormData object
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('description', description)
    formData.append('category', category.join(','))
    formData.append('stars', stars)
    formData.append('thumbnail', thumbnail) // Append the file

    const response = await axios
      .post(baseURL, formData)
      .then((response) => {
        setTitle('')
        setSlug('')
        setDescription('')
        setStars('')
        setThumbnail('')
        setCategory([])

        console.log('==============================')
        console.log('Data submitted to backend Successfully !!!')
        console.log('==============================')
      })
      .catch((error) => {
        console.log('==============================')
        console.error(`Erro adding a new book ${error}`)
        console.log('==============================')
      })

    console.log(response)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value.split(',').map((category) => category.trim()))
  }
  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={createBook}
        encType="multipart/form-data"
      >
        <input
          type="text"
          id="title"
          value={title}
          className=""
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <input
          type="text"
          id="slug"
          className="border-black"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter slug"
          required
        />
        <textarea
          type="text"
          id="desctiption"
          className=""
          value={description}
          rows={4}
          cols={40}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        <div>
          <label>Categories (comma-seperated) </label>
          <input
            type="text"
            id="category"
            className="border-gray"
            value={category.join(', ')}
            onChange={handleCategoryChange}
            placeholder="Enter categories (comma-separated)"
            required
          />
        </div>

        <input
          type="file"
          name="thumbnail"
          accept="image/gif, image/jpeg, image/png"
          onChange={(e) => {
            setThumbnail(e.target.files[0])
          }}
        />
        <button className="" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default page
