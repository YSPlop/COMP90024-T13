import React from 'react'
import {Paper, Box, Button, Container, Typography} from '@mui/material'
import { styled } from '@mui/system';

//Create custom components, that uses MUI to make DIVS. 

const DivComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
});

function TwitterMelbournePage() {
  return (
    //Figure out how to use Gap in your buttons to make it accurate. 
    <>
      <Box>
    

      <h1>Twitter Page</h1>
      <Box sx={{ flexDirection:'column', marginBottom:'20px'}}>
        <Button sx={{marginRight:'10px'}} variant='contained' >Melbourne </Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Sydney</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Adelaide</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Brisbaine</Button>
        <Button sx={{marginRight:'10px'}}variant='contained'>Perth</Button>
       </Box>
      <Paper elevation={24} square={true} variant="outlined">
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
              <h3>Iframes in lol</h3>
              <iframe src="http://127.0.0.1:8080/map.html" width = {1000} height = "500"></iframe>
          </DivComponent>

          <DivComponent>
            <Typography>
              iasdfougioadfbuioubfgaidobvaibfdivbuiasp
            </Typography>
          </DivComponent>
        </Container>
        </Paper>
        </Box>

    </>
  )
}

export default TwitterMelbournePage