'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const urlSlug = useParams()
  const [data, setData] = useState([])
  const baseURL = `http://localhost:8000/api/books/${urlSlug.slug}`

  useEffect(() => {
    const fecthedData = async () => {
      try {
        const response = await fetch(baseURL)

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.log(error)
      }
    }
    fecthedData()
  }, [])

  return (
    <div>
      <h1>Single page</h1>
      <p>My Title: {data.title}</p>
      <p>My slug: {data.slug}</p>
      <p>My description: {data.description}</p>
    </div>
  )
}
