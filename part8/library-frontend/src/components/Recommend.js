import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS) 
  const me = useQuery(ME)
  const [books, setBooks] = useState([])
  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  },[result])

  if (!show) {
    return null
  }
  

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr align="left">
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            if(a.genres.includes(me.data.me.favoriteGenre)){
              return(
                <tr key={a.title} align="left">
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            }
            else{
              return null
            }
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend 