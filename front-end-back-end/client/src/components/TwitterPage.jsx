import React from 'react'
import { Paper, Box, Button, Container, Typography } from '@mui/material'
import { styled } from '@mui/system';

//Create custom components, that uses MUI to make DIVS. 

const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
});

function TwitterPage() {

  // const twitter_melbourne_dest = "http://localhost:5173/twitter-melbourne"
  const twitter_melbourne_dest = "http://127.0.0.1:8080/map.html"
  

  // You use state whenever you want to change a value of something dynamically with the value change on the website
  const [iFrameLocation, setiFrameLocation] = React.useState("")

  return (
    //Figure out how to use Gap in your buttons to make it accurate. 
    <>
      <div>
      <Box>

      <Box>
      <div>
            <Button sx = {{mr : 2.5}}
              variant="contained" 
              onClick={() => {
                window.location.href = 'http://localhost:5173/Twitter'
              }}>
                Twitter
            </Button>

            
            
            <Button 
              variant="contained" 
              onClick={() => {
                window.location.href = 'http://localhost:5173/Mastadon'
              }}>
                Mastadon
            </Button>
        </div>
      </Box>
      
      <h1>Twitter Page</h1>

      <Box sx={{ flexDirection:'column', marginBottom:'20px'}}>
        {/*<Button sx={{marginRight:'10px'}} variant='contained' onClick={()=> {window.location.href = twitter_melbourne_dest }}>Melbourne </Button> */}
        <Button sx={{marginRight:'10px'}} variant='contained' onClick={()=> {setiFrameLocation(twitter_melbourne_dest)}}>Melbourne</Button>
        <Button sx={{marginRight:'10px'}}variant='contained' >Sydney</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Adelaide</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Brisbaine</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Perth</Button>
       </Box>
      <Paper square={true} variant="outlined">
        <Container fixed> 
          {/* { {data.map(item => (
            <React.Fragment key={item.id}>
              <Card sx={{ minWidth: 500, height: '250px', backgroundColor:'yellow', variant:"outlined" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    {item}
                  </Typography>
                </CardContent>
              </Card>
            </React.Fragment>
          ))} } */}

          {/*
          
            Use state to handle your states for the buttons
            Ternary operator to switch between different states to display the different view
              - chain ternary operator

          */}

          <DivComponent>
              <h3>Iframes in React</h3>
              {/* <iframe src="http://127.0.0.1:8080/map.html" width = {1000} height = "500"></iframe> */}
              <iframe src= {iFrameLocation} width = {1000} height = "500"></iframe>
          </DivComponent>

          <DivComponent>
            <Typography>
              hi this is the twitter page
            </Typography>
          </DivComponent>
        </Container>
        </Paper>
        </Box>
        </div>
    </>
  )
}

export default TwitterPage