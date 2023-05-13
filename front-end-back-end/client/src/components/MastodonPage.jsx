import { Typography, Box, Button } from '@mui/material'
import { Navigate } from 'react-router-dom'
import React from 'react'

// Learn how to do refresh 
// live count of Mastadon data, total tweets
// pick a category and show how many of those tweets

function displayCount(couchdbCount){
  console.log(couchdbCount);
  if (couchdbCount){
    return <Typography variant="h1"> {couchdbCount} </Typography>
  }else{
    return <Typography variant="h1"> Loading... </Typography>
  }
}

function MastodonPage() {

  // constant update values
  const [hashTagList, setHashTagList] = React.useState([])
  const [couchdbCount, setCouchDBCount] = React.useState([])

  // Navigation states
  const [goToTwitter, setGoToTwitter] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);

  const portNumberForServer = 5100;
  const memberServerIP = "http://127.0.0.1:"+ portNumberForServer + "/members"
  const couchdbCountIP = "http://127.0.0.1:"+ portNumberForServer + "/mastadon_server_count"

  // Set Member names
  React.useEffect(() => {
      fetch(memberServerIP)
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

    // Every 1000ms (1s) data is fetched from couchdb to be represented in the front end
    React.useEffect(() => {
      const interval = setInterval(() => {
        fetch(couchdbCountIP)
          .then(res => res.json())
          .then(
            (result) => {
                console.log('result', result)
                setCouchDBCount(result);
            },
            (error) => {
              console.log(error)
            }
          )
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  

  if (goToTwitter){
    return <Navigate to="/Twitter" />;
  }else if (goToHome){
    return <Navigate to="/"/>;
  }

  return (
    <div>
      <Box>
      <div>
            <Button sx = {{mr : 2.5}}
              variant="contained" 
              onClick={() => {
                // window.location.href = 'http://localhost:5173/Twitter'
                setGoToHome(true);
              }}>
                Home
            </Button>

            
            
            <Button 
              variant="contained" 
              onClick={() => {
                // window.location.href = 'http://localhost:5173/Mastadon'
                setGoToTwitter(true);
              }}>
                Twitter
            </Button>
        </div>
      </Box>

      <Box>
        {displayCount(couchdbCount)}
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