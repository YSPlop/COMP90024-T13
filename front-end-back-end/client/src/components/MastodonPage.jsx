import { Typography, Box, Button } from '@mui/material'
import React from 'react'



//useNavigate 
// import { useNavigate } from 'react-router-dom'
// navigate = useNavigate (


// Drop down with all the hashtags, a list value in a drop down.

// Learn how to do refresh 
// live count of Mastadon data, total tweets
// pick a category and show how many of those tweets

function MastodonPage() {

  const [hashTagList, setHashTagList] = React.useState([])

  React.useEffect(() => {
      fetch("http://127.0.0.1:5000/members")
        .then(res => res.json())
        .then(
          (result) => {
              console.log('result', result)
              setHashTagList(result);
          },
          (error) => {
            console.log(error)
          }
        )
    }, [])



  return (
    <div>
      <Box>
      <div>
            <Button sx = {{mr : 2.5}}
              variant="contained" 
              onClick={() => {
                window.location.href = 'http://localhost:5173/Twitter'
              }}>
                Twitter
            </Button>

            
            
            <Button 
              variant="contained" 
              onClick={() => {
                window.location.href = 'http://localhost:5173/Mastadon'
              }}>
                Mastadon
            </Button>
        </div>
      </Box>
      <Box>
        <Typography variant="h1">Mastodon Page</Typography>
          {
          (typeof hashTagList === 'undefined') ? (
              <p>Loading...</p>
          ):(
              hashTagList.map ( (member, i) =>
                  <p key={i}>{member}</p>
            ))
          }
      </Box>

    </div>
    
  )
}

export default MastodonPage