import React from 'react'
import { Paper, Box, Button, Container, Typography, MenuItem, Menu } from '@mui/material'
import { styled } from '@mui/system';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom';

// imports for images
import melbourneImage from "../assets/Melbourne.png"
import sydneyImage from "../assets/Sydney.png"
import adelaideImage from "../assets/Adelaide.png"
import brisbaneImage from "../assets/Brisbaine.png"
import perthImage from "../assets/Perth.png"

//Create custom components, that uses MUI to make DIVS. 
const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
});

// Depnding on whether graph or statistics is required, display required information
function maybeMap(displayGraph, iFrameLocation, stateName){
    if (displayGraph == true){
      
        return <iframe src= {iFrameLocation} width = {1000} height = "500"></iframe>

    }else{ 
      if (stateName == "Melbourne"){
        return <img src={melbourneImage} alt="lol" width = {1000} height = "500"></img>
      }else if (stateName == "Sydney"){
        return <img src={sydneyImage} alt="lol" width = {1000} height = "500"></img>
      }else if (stateName == "Adelaide"){
        return <img src={adelaideImage} alt="lol" width = {1000} height = "500"></img>
      }else if (stateName == "Brisbaine"){
        return <img src={brisbaneImage} alt="lol" width = {1000} height = "500"></img>
      }else if (stateName == "Perth"){
        return <img src={perthImage} alt="lol" width = {1000} height = "500"></img>
      }else{
        return "Invalid button"
      }
  }
}


function TwitterPage() {

  const twitter_default = "https://en.wikipedia.org/wiki/HI"
  const twitter_melbourne_dest = "http://127.0.0.1:1000/map.html"
  const twitter_sydney_dest = "https://en.wikipedia.org/wiki/Apache_CouchDB"
  const twitter_adelaide_dest = "https://en.wikipedia.org/wiki/React_(software)"
  const twitter_brisbane_dest = "https://en.wikipedia.org/wiki/Ansible"
  const twitter_perth_dest = "https://en.wikipedia.org/wiki/Python_(programming_language)"
  
  // You use state whenever you want to change a value of something dynamically with the value change on the website
  const [iFrameLocation, setiFrameLocation] = React.useState(twitter_default);

  // Navigation buttons
  const [goToHome, setGoToHome] = React.useState(false);
  const [goToMastadon, setGoToMastadon] = React.useState(false);

  // Drop down buttons
  const[displayGraph, setDisplayGraph] = React.useState(true);
  const[stateName, setStateName] = React.useState("");

  // Navigation Control
  if (goToHome){
    return <Navigate to="/"/>;
  }
  if (goToMastadon){
    return <Navigate to="/Mastadon"/>;
  }

  return (
    <>
      <div>
      <Box>
        
        {/* Navigation buttons */}
        <Box>
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
                  setGoToMastadon(true);
                }}>
                  Mastadon
              </Button>
          </div>
        </Box>
            
        <h1>Twitter Page</h1>

        
        
         {/* Location buttons */}
        <Box sx={{ flexDirection:'column', marginBottom:'20px'}}>
          <Button sx={{marginRight:'10px'}} variant='contained' onClick={()=> {setiFrameLocation(twitter_melbourne_dest); setStateName("Melbourne")}}>Melbourne</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_sydney_dest); setStateName("Sydney")}}>Sydney</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_adelaide_dest); setStateName("Adelaide")}}>Adelaide</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_brisbane_dest); setStateName("Brisbaine")}}>Brisbaine</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_perth_dest); setStateName("Perth")}}>Perth</Button>
        </Box>


         {/* Big Box with drop down and graph */}
         <Box sx={{display:"flex", gap:"1rem"}} >
          {/*Drop down Menu to select graph or picture */}
          <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button style={{maxHeight: '40px'}} variant="contained" {...bindTrigger(popupState)}>
                    Presentation Type
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(true);}}>Graph</MenuItem>
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(false);}}>Demographic</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
          </PopupState>

          {/* Graph and text */}
          <Paper square={true} variant="outlined">
            <Container fixed> 
              <DivComponent>
                  <Typography variant="h2">{stateName}</Typography>
                      {maybeMap(displayGraph, iFrameLocation, stateName)}
              </DivComponent>

              <DivComponent>
                <Typography>
                  hi this is the twitter page
                </Typography>
              </DivComponent>
            </Container>
          </Paper>

        </Box> 
      </Box>
      </div>
    </>
  )
}

export default TwitterPage