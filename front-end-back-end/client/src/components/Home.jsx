import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link'
import { Button } from '@mui/material';

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