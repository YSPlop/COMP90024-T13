import { Typography, Box, Button, Menu, MenuItem } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom'
import React from 'react'

// Learn how to do refresh 
// live count of Mastadon data, total tweets
// pick a category and show how many of those tweets

function displayCount(couchdbCount){
  console.log(couchdbCount);
  console.log(couchdbCount);
  if (couchdbCount != 'undefined'){
    return <Typography variant="h1"> {couchdbCount} </Typography>
  }else{
    return <Typography variant="h1"> Loading... </Typography>
  }
}

function MastodonPage() {

  const backendIP = "127.0.0.1";
  const backendPortNumber = "5100";

  // constant update values
  const [hashTagList, setHashTagList] = React.useState()
  const [couchdbCount, setCouchDBCount] = React.useState([])

  // Navigation states
  const [goToTwitter, setGoToTwitter] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);

  const memberServerIP = "http://" + backendIP + ":" + backendPortNumber + "/members"
  const couchdbCountIP = "http://" + backendIP + ":"+ backendPortNumber + "/mastadon_server_count"

  // Set Member names from backend
  React.useEffect(() => {
     
      fetch(memberServerIP)
        .then()
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
    }, []);

    // Every 1000ms (1s) mastadon data is fetched from couchdb to be represented in the front end
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
    });

  

  if (goToTwitter){
    return <Navigate to="/Twitter" />;
  }else if (goToHome){
    return <Navigate to="/"/>;
  }

  return (
    <div>

      {/* Navigation buttons */}
      <Box sx = {{mb: 7.5}}>
      <div>
            <Button sx = {{mr : 2.5}}
              variant="contained" 
              onClick={() => {
                setGoToHome(true);
              }}>
                Home
            </Button>

            <Button 
              variant="contained" 
              onClick={() => {
                setGoToTwitter(true);
              }}>
                Twitter
            </Button>
        </div>
      </Box>
      
      {/* Dynamic CouchDB count */}
      <Box>
        {displayCount(couchdbCount)}
      </Box>

      {/* Make a hash tag drop down */}
      <Box sx = {{mb: 7.5}}>
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button style={{maxHeight: '40px'}} variant="contained" onClick={() => {window.location.reload(true)}}{...bindTrigger(popupState)}>
                  Presentation Type
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {typeof hashTagList === 'undefined' ? (
                      <MenuItem>Loading </MenuItem>
                    ) : (
                      hashTagList && hashTagList.length > 0 ? (
                        hashTagList.map((member, index) => (
                          <MenuItem key={index} value={member}>
                            {member}
                          </MenuItem>
                      ))) : (
                        <p>No data available</p>
                      )
                    )
                  }
                </Menu>
              </React.Fragment>
            )}
        </PopupState>
      </Box>
      
      {/* Heading with member list from backend */}
      <Box>
        <Typography variant="h1">Mastodon Page</Typography>
          
          {/* Going through the list to print each member */}
          {typeof hashTagList === 'undefined' ? (
            <p>Loading...</p>
          ) : (
            hashTagList && hashTagList.length > 0 ? (
              hashTagList.map((member, i) => <p key={i}>{member}</p>)
            ) : (
              <p>No data available</p>
            )
          )}
      </Box>

      

    </div>
    
  )
}

export default MastodonPage