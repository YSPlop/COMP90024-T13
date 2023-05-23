import React from 'react'
import {Box, Button, Container, Typography, MenuItem, Menu, getLinearProgressUtilityClass } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom';


// Depnding on whether graph or statistics is required, display required information
function maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber, graphType){

  const width = 750;


  // image locations on server
  // by default you use scatter plot settings
  let victoria1DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic1_scatter.png";
  let victoria2DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic2_scatter.png"
  let sydneyDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/nsw_scatter.png"
  let adelaideDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/sa_scatter.png"
  let brisbaneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/qld_scatter.png"

  if (graphType == "Violin"){

    victoria1DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic1_violin.png";
    victoria2DemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/vic2_violin.png"
    sydneyDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/nsw_violin.png"
    adelaideDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/sa_violin.png"
    brisbaneDemographicURL = "http://" + httpIP + ":" + httpPortNumber + "/graphs/qld_violin.png"

  }


  if (displayGraph == true){

      return <iframe src= {iFrameLocation} width={1300} height="600"></iframe>

  }else{ 
    if (stateName == "VIC1"){
      return <img src={victoria1DemographicURL} alt="Victoria1Demographic" width = {width} height = "500"></img>
    }else if (stateName == "VIC2"){
      return <img src={victoria2DemographicURL} alt="Victoria2Demographic" width = {width} height = "500"></img>
    }else if (stateName == "NSW"){
      return <img src={sydneyDemographicURL} alt="NSW Demographic" width = {width} height = "500"></img>
    }else if (stateName == "SA"){
      return <img src={adelaideDemographicURL} alt="SADemographic" width = {width} height = "500"></img>
    }else if (stateName == "QLD"){
      return <img src={brisbaneDemographicURL} alt="QLDDemographic" width = {width} height = "500"></img>
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

  const[graphType, setGraphType] = React.useState("Scatter-Plot");

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
          <Button sx={{marginRight:'10px'}} variant='contained' onClick={()=> {setiFrameLocation(twitter_vic1_dest); setStateName("VIC1")}}>Victoria1</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_vic2_dest); setStateName("VIC2")}}>Victoria2</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_sydney_dest); setStateName("NSW")}}>New South Wales</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_adelaide_dest); setStateName("SA")}}>South Australia</Button>
          <Button sx={{marginRight:'10px'}}variant='contained' onClick={()=> {setiFrameLocation(twitter_queensland_dest); setStateName("QLD")}}>Queensland</Button>
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
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(false); setGraphType("Scatter-Plot")}}>Scatter Plot</MenuItem>
                    <MenuItem onClick={() => {popupState.close; setDisplayGraph(false); setGraphType("Violin")}}>Violin</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
          </PopupState>

          {/* Graph and text */}
          <Container>
              <Typography variant="h4">{stateName}</Typography>
              <div style={{ marginLeft: 0}}>
                {maybeMap(displayGraph, iFrameLocation, stateName, httpIP, httpPortNumber, graphType)}
              </div>
          </Container>
          

        </Box> 
      {/* </Box> */}
      </div>
    </>
  )
}

export default TwitterPage