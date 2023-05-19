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
    if (barChartAddress == ""){
      return (
      <Typography variant="h3"> Press a button </Typography>
      )
    }else{
      return <img src= {destinationBarChartAdress} alt="bargraph" width = {width} height = "500"></img>
    }
  }else{
    return <img src={destinationURLHistogram} alt="hashtag_histogram_demographic" width = {width} height = "500"></img>
  }

}

// Display the count if count is available
function displayCount(couchdbCount){
  console.log("couchDB count is ", {couchdbCount});
  if (couchdbCount != 0){
    return <Typography variant="body"> couchdbcount: {couchdbCount} </Typography>
  }else{
    return <Typography variant="body"> couch DB count Loading... </Typography>
  }
}

function MastodonPage() {

  // IP address and port numbers for the backend code
  const backendIP = "172.26.135.101";
  const backendPortNumber = "80";

  // IP address and port numbers for the http server
  const httpIP = "172.26.135.101";
  const httpPortNumber = "8081";

  // BackEnd IP addresses
  const hashTagListIP = "http://" + backendIP + ":" + backendPortNumber + "/hashtagList"
  const barChartIP = "http://" + backendIP + ":" + backendPortNumber + "/barChart"
  const histogramChartIP = "http://" + backendIP + ":" + backendPortNumber + "/histogram"
  const couchdbCountIP = "http://" + backendIP + ":"+ backendPortNumber + "/mastadon_server_count"

  const width = 750;
  
  // states for fetching hash tag list and maintain information of the current hashtag we are viewing
  const [hashTagList, setHashTagList] = React.useState()
  const [currentHashTag, setCurrentHashTag] = React.useState()

  // variable to keep track of the number of toots from Mastadon through couchDB
  const [couchdbCount, setCouchDBCount] = React.useState(0)

  // states for bar chart and histogram that is used to store the location for the saved barchart and histogram
  const [barChartDisplay, setbarChartDisplay] = React.useState(true)
  const [barChartAddress, setBarChartAddress] = React.useState("")

  const [histogramAddress, setHistogramAddress] = React.useState("")

  // Navigation states
  const [goToTwitter, setGoToTwitter] = React.useState(false);
  const [goToHome, setGoToHome] = React.useState(false);

  
  /*
  * when the hashtag is chosen 
    * 1. current hashtag value passed in as member
    * 2. send the value to flask as a variable as a json {hashtag: {member: <Current hash tag value>}}
    * 3. the variable is passed to the backend and generate a graph
    * 4. the function returns the relative location of the file in http server
  */
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

  /*
  * When a button is clicked this function is called
  * This function then generates a graph and returns the location in http server
  */
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

  
  // Retrieves hash tag list from mastadon couchDB
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

  
  // Retrieves couchDB count from mastadon couchDB
  React.useEffect(() => {
      
    const callCouchDB = async() => {
      await fetch(couchdbCountIP)
        .then(res => res.json())
        .then(
          (result) => {
              console.log('couchDB count', result)
              setCouchDBCount(result);
          },
          (error) => {
            console.log(error)
          }
        )
    }
    
    callCouchDB().catch(console.error);

  }, [])
  
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

      {/* CouchDB count */}
      <Box sx = {{mb: 7.5}}>
        {displayCount(couchdbCount)}
      </Box>

      {/* Bar chart and hash tag buttons, Layer to control the layout of buttons to control the graphs and the graph */}
      <Box sx={{display:"flex", gap:"1rem"}} >

        {/* Bar chart button */}
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