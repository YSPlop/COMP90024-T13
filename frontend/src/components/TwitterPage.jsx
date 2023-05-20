import React from 'react'
import {Box, Button, Container, Typography, MenuItem, Menu } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom';


// Depnding on whether graph or statistics is required, display required information
function maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber){

  const width = 750;


  // image locations on server
  const melbourneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Melbourne.png";
  const sydneyDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Sydney.png"
  const adelaideDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Adelaide.png"
  const brisbaneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Brisbaine.png"
  const perthDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Perth.png"


  if (displayGraph == true){

      return <iframe src= {iFrameLocation} width={1300} height="600"></iframe>

  }else{ 
    if (stateName == "Melbourne"){
      return <img src={melbourneDemographicURL} alt="MelbourneDemographic" width = {width} height = "500"></img>
    }else if (stateName == "Sydney"){
      return <img src={sydneyDemographicURL} alt="SydneyDemographic" width = {width} height = "500"></img>
    }else if (stateName == "Adelaide"){
      return <img src={adelaideDemographicURL} alt="AdelaideDemographic" width = {width} height = "500"></img>
    }else if (stateName == "Brisbane"){
      return <img src={brisbaneDemographicURL} alt="BrisbaneDemographic" width = {width} height = "500"></img>
    }else if (stateName == "Perth"){
      return <img src={perthDemographicURL} alt="PerthDemographic" width = {width} height = "500"></img>
    }else{
      return "Invalid button"
    }
  }
}


function TwitterPage() {

  const httpIP = "172.26.135.101"
  const httpPortNumber = "8081"

  const twitter_melbourne_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/melbourne-map1.html"
  const twitter_sydney_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/sydney-map.html"
  const twitter_adelaide_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/adelaide-map.html"
  const twitter_brisbane_dest = "https://en.wikipedia.org/wiki/Ansible"
  const twitter_perth_dest = "https://en.wikipedia.org/wiki/Python_(programming_language)"
  
  // You use state whenever you want to change a value of something dynamically with the value change on the website
  const [iFrameLocation, setiFrameLocation] = React.useState(twitter_melbourne_dest);

  // Navigation buttons
  const [goToHome, setGoToHome] = React.useState(false);
  const [goToMastadon, setGoToMastadon] = React.useState(false);

  // Drop down buttons
  const[displayGraph, setDisplayGraph] = React.useState(true);
  const[stateName, setStateName] = React.useState("Melbourne");

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
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_brisbane_dest); setStateName("Brisbane")}}>Brisbaine</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_perth_dest); setStateName("Perth")}}>Perth</Button>
        </Box>

         {/* Big Box with drop down and graph */}
        {/* <Box sx={{display:"flex", gap:"1rem"}} > */}
          {/*Drop down Menu to select graph or picture */}
          <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button sx ={{mb:10}} style={{maxHeight: '40px'}} variant="contained" {...bindTrigger(popupState)}>
                    Version
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(true);}}>Graph</MenuItem>
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(false);}}>Demographic</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
          </PopupState>

          {/* Graph and text */}
          <Container>
              <Typography variant="h4">{stateName}</Typography>
              <div style={{ marginLeft: 0}}>
                {maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber)}
              </div>
          </Container>
          

        </Box> 
      {/* </Box> */}
      </div>
    </>
  )
}

export default TwitterPage