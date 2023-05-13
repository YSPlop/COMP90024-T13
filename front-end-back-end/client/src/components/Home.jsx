import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

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
    // http-server -p 1000 -g ./map.html

    const [goToTwitter, setGoToTwitter] = React.useState(false);
    const [goToMastadon, setGoToMastadon] = React.useState(false);

    if (goToTwitter){
      return <Navigate to="/Twitter"/>;
    }
    if (goToMastadon){
      return <Navigate to="/Mastadon"/>;
    }


      return (
        <>
        <div>
        <div>
            <Button 
              sx = {{mr : 2.5}}
              variant="contained" 
              size="large"
              onClick={() => {
                setGoToTwitter(true)
              }}>
                <Typography>
                  Twitter
                </Typography>
            </Button>
            
            <Button 
              variant="contained"
              size="large" 
              onClick={() => {
                setGoToMastadon(true)
              }}>
                Mastadon
            </Button>
        </div>
        </div>  
        </>
      );
}