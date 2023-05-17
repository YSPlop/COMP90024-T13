import React from 'react'
import { Paper, Box, Button, Container, Typography, MenuItem, Menu } from '@mui/material'
import { styled } from '@mui/system';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom';

//Create custom components, that uses MUI to make DIVS. 
const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
});

// Depnding on whether graph or statistics is required, display required information
function maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber){


  // image locations on server
  const melbourneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Melbourne.png";
  const sydneyDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Sydney.png"
  const adelaideDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Adelaide.png"
  const brisbaneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Brisbaine.png"
  const perthDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/Perth.png"


  if (displayGraph == true){
    
      return <iframe src= {iFrameLocation} width = {1000} height = "500"></iframe>

  }else{ 
    if (stateName == "Melbourne"){
      return <img src={melbourneDemographicURL} alt="MelbourneDemographic" width = {1000} height = "500"></img>
    }else if (stateName == "Sydney"){
      return <img src={sydneyDemographicURL} alt="SydneyDemographic" width = {1000} height = "500"></img>
    }else if (stateName == "Adelaide"){
      return <img src={adelaideDemographicURL} alt="AdelaideDemographic" width = {1000} height = "500"></img>
    }else if (stateName == "Brisbaine"){
      return <img src={brisbaneDemographicURL} alt="BrisbaineDemographic" width = {1000} height = "500"></img>
    }else if (stateName == "Perth"){
      return <img src={perthDemographicURL} alt="PerthDemographic" width = {1000} height = "500"></img>
    }else{
      return "Invalid button"
    }
  }
}


function TwitterPage() {

  const httpIP = "172.26.135.101"
  const httpPortNumber = "8081"

  const twitter_default = "https://en.wikipedia.org/wiki/HI"
  const twitter_melbourne_dest = "http://"+ httpIP + ":" + httpPortNumber + "/maps/melbourne-map.html"
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
                      {maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber)}
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