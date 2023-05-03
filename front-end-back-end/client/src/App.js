// useState will be used to create a state variable which will contain to store the data retrieved from the backend and render the data on the page
// useEffect will be used to fetch the backend API from the server
import React, {useState, useEffect }from 'react'

function App() {
  
  const [data, setData] = useState([{}])

  useEffect(() => {
      fetch("/members").then(
        // put the response into json
        res => res.json()
      ).then(
          data => {
            // using a default function
            setData(data)
            console.log(data)
          }
      )
  }, [])

  return (
    <div>
        {(typeof data.members === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, i) => (
              <p key = {i}>{member}</p>
          ))
        )}
    </div>
  )
}

export default App