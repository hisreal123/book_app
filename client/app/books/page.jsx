'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

export default function page() {
  const baseURL = 'http://localhost:8000/api/books'
  const [data, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  // Event handler for select change
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value)``
  }

  /** =============== fething data from the database ================*/
  useEffect(() => {
    const fecthedData = async () => {
      try {
        let url = baseURL

        if (selectedCategory) {
          url += `?category=${selectedCategory}`
        }

        const response = await axios.get(url)

        const jsonData = response.data
        setData(jsonData)
      } catch (error) {
        console.log(error)
      }
    }

    fecthedData()
  }, [selectedCategory])

  return (
    <div className="bg-white text-black min-h-full w-[80%] mx-auto ">
      <div className="flex justify-between w-full relative mb-3 py-4">
        <Link
          href="/"
          className="rounded-full bg-white w-[50px] h-[50px] shadow-xl flex justify-center items-center"
        >
          <FaArrowLeft className="text-lg" />
        </Link>
        <Link
          href="/books/add"
          className="px-4 py-1 bg-black text-white cursor-pointer"
        >
          Add book
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-7">
        {data.map((item) => (
          <div className="" key={item.id}>
            <Link href={`/books/${item.slug}`}>
              <div className="h-[150px] w-auto overflow-hidden rounded-md">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <h3 className="text-xl font-bold mt-2 "> {item.title} </h3>
              <h3 className="text-sm text-gray-700"> {item.description} </h3>
              <span>{item.createdAt}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// <label>Categories</label>
// <select value={selectedCategory} onChange={handleSelectChange}>
//     <option value="">Choose a category</option>
//     <option value="Suspense">Suspense</option>
//     <option value="Mystery">Mystery</option>
//     <option value="Romance">Romance</option>
// </select>
