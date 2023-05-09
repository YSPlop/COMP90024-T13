import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



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


      return (
        <>
          {data.map(item => (
            <React.Fragment key={item.id}>
              <Card sx={{ minWidth: 500, height: '250px', backgroundColor:'yellow', variant:"outlined" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    {item}
                  </Typography>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}

        </>
      );
}