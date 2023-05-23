/**
 * Team 13: Alex Wang 1427869, Ka Shun Carson Young 1086178, Eldon Yeh 1276574, Yukash Sivaraj 1054297
 */
import React from 'react'
import {Box, Button, Container, Typography, MenuItem, Menu } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom';


// Depnding on whether graph or statistics is required, display required information
function maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber){

  const width = 750;


  // image locations on server
  const victoria1DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic1.png";
  const victoria2DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic2.png"
  const sydneyDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/nsw.png"
  const adelaideDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/sa.png"
  const brisbaneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/qld.png"


  if (displayGraph == true){

      return <iframe src= {iFrameLocation} width={1300} height="600"></iframe>

  }else{ 
    if (stateName == "Victoria1"){
      return <img src={victoria1DemographicURL} alt="Victoria1Demographic" width = {width} height = "500"></img>
    }else if (stateName == "Victoria2"){
      return <img src={victoria2DemographicURL} alt="Victoria2Demographic" width = {width} height = "500"></img>
    }else if (stateName == "Sydney"){
      return <img src={sydneyDemographicURL} alt="Sydney Demographic" width = {width} height = "500"></img>
    }else if (stateName == "Adelaide"){
      return <img src={adelaideDemographicURL} alt="AdelaideDemographic" width = {width} height = "500"></img>
    }else if (stateName == "Brisbane"){
      return <img src={brisbaneDemographicURL} alt="BrisbaneDemographic" width = {width} height = "500"></img>
    }else{
      return "Invalid button"
    }
  }
}


function TwitterPage() {

  const httpIP = "172.26.135.101"
  const httpPortNumber = "8081"


  const twitter_vic1_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/vic-map1.html"
  const twitter_vic2_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/vic-map2.html"
  const twitter_sydney_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/nsw-map.html"
  const twitter_adelaide_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/sa-map.html"
  const twitter_queensland_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/qld-map.html"
  
  // You use state whenever you want to change a value of something dynamically with the value change on the website
  const [iFrameLocation, setiFrameLocation] = React.useState(twitter_vic1_dest);

  // Navigation buttons
  const [goToHome, setGoToHome] = React.useState(false);
  const [goToMastadon, setGoToMastadon] = React.useState(false);

  // Drop down buttons
  const[displayGraph, setDisplayGraph] = React.useState(true);
  const[stateName, setStateName] = React.useState("Victoria1");

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
          <Button sx={{marginRight:'10px'}} variant='contained' onClick={()=> {setiFrameLocation(twitter_vic1_dest); setStateName("Victoria1")}}>Victoria1</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_vic2_dest); setStateName("Victoria2")}}>Victoria2</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_sydney_dest); setStateName("Sydney")}}>Sydney</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_adelaide_dest); setStateName("Adelaide")}}>Adelaide</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_queensland_dest); setStateName("Brisbane")}}>Brisbane</Button>
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