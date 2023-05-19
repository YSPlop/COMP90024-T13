import { Typography, Box, Button, Menu, MenuItem, Paper, Container, } from '@mui/material'
import { styled } from '@mui/system';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Navigate } from 'react-router-dom'
import React from 'react'

//Create custom components, that uses MUI to make DIVS. 
const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  width: 800,
  height: 600,
});

// Depending on the set currentHashTag display the right picture
/*
  currentHashTag: the same name should be used for hash tag demographic png
*/
function displayGraph(currentHashTag, httpIP, httpPortNumber, width, barChartDisplay, barChartAddress, histogramAddress){

  // image locations on server 
  // you add the date at the end to make the URL unique everytime you click it so it forced a refresh for the picture
  const destinationBarChartAdress  = "http://" + httpIP + ":" + httpPortNumber + barChartAddress
  
  
  const destinationURLHistogram = "http://" + httpIP + ":" + httpPortNumber + histogramAddress;
  console.log("histogram address is " + destinationURLHistogram);

  if (barChartDisplay == true){
    console.log("barchart address is " + destinationBarChartAdress);
    return <img src= {destinationBarChartAdress} alt="bargraph" width = {width} height = "500"></img>
  }else{
    return <img src={destinationURLHistogram} alt="hashtag_histogram_demographic" width = {width} height = "500"></img>
  }

}

function MastodonPage() {

  const backendIP = "127.0.0.1";
  const backendPortNumber = "5100";

  const httpIP = "127.0.0.1";
  const httpPortNumber = "1000";

  // BackEnd IP addresses
  const hashTagListIP = "http://" + backendIP + ":" + backendPortNumber + "/hashtagList"
  const barChartIP = "http://" + backendIP + ":" + backendPortNumber + "/barChart"
  const histogramChartIP = "http://" + backendIP + ":" + backendPortNumber + "/histogram"

  const width = 750;
  

  // constant update values
  const [hashTagList, setHashTagList] = React.useState()
  const [currentHashTag, setCurrentHashTag] = React.useState("")

  const [barChartDisplay, setbarChartDisplay] = React.useState(true)
  const [barChartAddress, setBarChartAddress] = React.useState("")

  const [histogramAddress, setHistogramAddress] = React.useState("")

  // Navigation states
  const [goToTwitter, setGoToTwitter] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);

  

  async function hashTagButtonHandler(member)  {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hashtag: {member}})
    };

    console.log("Current hashtag in handler is " + currentHashTag);

    await fetch(histogramChartIP, requestOptions)
      .then(res => res.json())
      .then(result => {
        setHistogramAddress(result);
        console.log('histogram fetched:', result);
        
      })
      .catch(error => {
        console.error('Error fetching histogram:', error);
      });

  }

  
  // Use effects
  // Set Member names from backend
  React.useEffect(() => {
     
    const callHashtagList = async() => {
      await fetch(hashTagListIP)
        .then()
        .then(res => res.json())
        .then(
          (result) => {
              console.log('hashtagList result', result)
              setHashTagList(result);
          },
          (error) => {
            console.log(error)
          }

        )
    } 
    callHashtagList().catch(console.error);

  }, []);

  async function getBarChartAdress(){

    await fetch(barChartIP)
        .then()
        .then(res => res.json())
        .then(
          (result) => {
              console.log('barChart result', result)
              setBarChartAddress(result);
          },
          (error) => {
            console.log("callBarChartAddress",  error)
          }
        )
  }
  
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
      <Typography variant="h2">Mastodon Page</Typography>
      <Box sx={{display:"flex", gap:"1rem"}} >


        <Box>    
          <Button sx = {{mb : 2.5}}
            style={{maxHeight: '40px'}}
            variant="contained" 
            onClick={() => {
              setbarChartDisplay(true);
              getBarChartAdress();

            }}>
              Bar Chart
          </Button>

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
                              <MenuItem key={index} data-my-value={member} onClick={() => {setCurrentHashTag(member); setbarChartDisplay(false); hashTagButtonHandler(member)}}> 
                                {member}
                              </MenuItem >
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
        </Box> 
        
        {/* Heading with picture for the hash tag clicked */}
        <Box>        
            <Paper square={true} variant="outlined">
              <Container fixed> 
                <DivComponent>
                    
                      <Typography variant="h2">{currentHashTag}</Typography>
                      {displayGraph(currentHashTag, httpIP, httpPortNumber, width, barChartDisplay, barChartAddress, histogramAddress)}
                    
                </DivComponent>
              </Container>
            </Paper>
            
        </Box>
      </Box>


      

    </div>
    
  )
}

export default MastodonPage