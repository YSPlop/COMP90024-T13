import { Typography, Box, Button, Menu, MenuItem, Paper, Container, } from '@mui/material'
import { styled } from '@mui/system';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios';

// Learn how to do refresh 
// live count of Mastadon data, total tweets
// pick a category and show how many of those tweets

//Create custom components, that uses MUI to make DIVS. 
const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
});

// Display the count if count is available
function displayCount(couchdbCount){
  if (couchdbCount != 'undefined'){
    return <Typography variant="h3"> couchdbcount: {couchdbCount} </Typography>
  }else{
    return <Typography variant="h3"> Loading... </Typography>
  }
}

// Depending on the set currentHashTag display the right picture
/*
  currentHashTag: the same name should be used for hash tag demographic png
 */
function displayGraph(currentHashTag, httpIP, httpPortNumber){

  // image locations on server 
  // you add the date at the end to make the URL unique everytime you click it so it forced a refresh for the picture
  const destinationURL = "http://" + httpIP + ":" + httpPortNumber + "/hashTagGraphs/" + currentHashTag + ".png" + "?" + new Date();

  return <img src={destinationURL} alt="hashtag_Demographic" width = {1000} height = "500"></img>

}

function MastodonPage() {

  const backendIP = "10.12.142.13";
  const backendPortNumber = "5100";

  const httpIP = "10.12.142.13";
  const httpPortNumber = "1000";

  // BackEnd IP addresses
  const memberServerIP = "http://" + backendIP + ":" + backendPortNumber + "/members"
  const couchdbCountIP = "http://" + backendIP + ":"+ backendPortNumber + "/mastadon_server_count"
  const randomNumIP = "http://" + backendIP + ":"+ backendPortNumber + "/random_number"
  

  // constant update values
  const [hashTagList, setHashTagList] = React.useState()
  const [couchdbCount, setCouchDBCount] = React.useState()
  const [currentHashTag, setCurrentHashTag] = React.useState("first")
  const [randomNumber, setRandomNumber] = React.useState(0)

  // Navigation states
  const [goToTwitter, setGoToTwitter] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);
  
  // Use effects
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

  function getRandomNumber(){
    fetch(randomNumIP)
      .then()
      .then(res => res.json())
      .then(
        (result) => {
            console.log('result', result)
            setRandomNumber(result);
        },
        (error) => {
          console.log(error)
        }

      )
  }

  // Set random number from backend
  // React.useEffect(() => {
     
  //   fetch(randomNumIP)
  //     .then()
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //           console.log('result', result)
  //           setRandomNumber(result);
  //       },
  //       (error) => {
  //         console.log(error)
  //       }

  //     )
  // },[randomNumIP]);

  

  
  // Navigation control
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

      {/* Heading */}
      <Typography variant="h1">Mastodon Page</Typography>

      {/* Random number */}
      <Box sx = {{mb: 7.5}}>
        
        
          <Button 
            variant="contained" 
            onClick={() => {
              {getRandomNumber()}
            }}>
              Random Number Button
          </Button>

        <Typography variant="h3">Random Number: {randomNumber}</Typography>
      </Box>
      
      {/* Dynamic CouchDB count */}
      <Box sx = {{mb: 7.5}}>
        {displayCount(couchdbCount)}
      </Box>

      {/* Make a hash tag drop down */}
      <Box sx = {{mb: 7.5}}>
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>

                {/* The drop down main button */}
                <Button style={{maxHeight: '40px'}} variant="contained" onClick={() => {window.location.reload(true)}}{...bindTrigger(popupState)}>
                  Presentation Type
                </Button>

                {/* The drop down menu */}
                <Menu {...bindMenu(popupState)}>
                  {typeof hashTagList === 'undefined' ? (
                      <MenuItem>Loading </MenuItem>
                    ) : (
                      hashTagList && hashTagList.length > 0 ? (
                        hashTagList.map((member, index) => (
                          <MenuItem key={index} value={member} onClick={()=> {setCurrentHashTag(member); getRandomNumber();}}>
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
      
      {/* Heading with picture for the hash tag clicked */}
      <Box key={currentHashTag}>        
          <Paper square={true} variant="outlined">
            <Container fixed> 
              <DivComponent>
                  
                    <Typography variant="h2">{currentHashTag}</Typography>
                    {displayGraph(currentHashTag, httpIP, httpPortNumber)}
                  
              </DivComponent>
            </Container>
          </Paper>
          
      </Box>


      

    </div>
    
  )
}

export default MastodonPage