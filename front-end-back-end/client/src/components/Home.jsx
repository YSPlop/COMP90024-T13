import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

export default function Home() {
  
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