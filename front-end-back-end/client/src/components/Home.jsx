import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import HTMLFile from './map.html?raw'
// import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper';

// import container from mumaterials
import Container from '@mui/material/Container';


export default function Home() {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        fetch("http://127.0.0.1:5000/members")
          .then(res => res.json())
          .then(
            (result) => {
                console.log('result', result.members)
                setData(result.members);
            },
            (error) => {
              console.log(error)
            }
          )
      }, [])

      //  you need to run the html server first 
      // http-server -g ./map.html
      return (
        <>
        <Paper elevation={24} square="true" variant="outlined">
       
        <Container fixed> 
          {/* {data.map(item => (
            <React.Fragment key={item.id}>
              <Card sx={{ minWidth: 500, height: '250px', backgroundColor:'yellow', variant:"outlined" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    {item}
                  </Typography>
                </CardContent>
              </Card>
            </React.Fragment>
          ))} */}

          <div className="App">
              <h3>Iframes in React</h3>
              <iframe src="http://100.95.194.150:8080/map.html" width = {1000} height = "500"></iframe>
          </div>

          <div className = "text">
            <h1>
              THIS IS A MAP
            </h1>
          </div>

          
          
        </Container>
        </Paper>  
        </>
      );
}