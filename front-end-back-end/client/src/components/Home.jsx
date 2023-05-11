import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link'
import { Button } from '@mui/material';
import {Paper} from '@mui/material';
import {Container} from '@mui/material';

export default function Home() {

    // const [data, setData] = React.useState([])

    // React.useEffect(() => {
    //     fetch("http://127.0.0.1:5000/members")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //             console.log('result', result.members)
    //             setData(result.members);
    //         },
    //         (error) => {
    //           console.log(error)
    //         }
    //       )
    //   }, [])

      //  you need to run the html server first 
      // http-server -g ./map.html
      return (
        <>
        <div>
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

          <div className = "App">
              <h3>Iframes in React</h3>
              <iframe src="http://127.0.0.1:8080/map.html" width = {1000} height = "500"></iframe>
          </div>

          <div className = "text">
            <h1>
              THIS IS A MAP
            </h1>
          </div>
        </Container>
        </Paper>

        <div>
            <Button 
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


        </div>  
        </>
      );
}