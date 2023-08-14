import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Reservation } from '../models/ReservisionModel';
import { format } from 'date-fns';

export default function ImgMediaCard({ reservation }: { reservation: Reservation }) {
  console.log(reservation);
  return (
    <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt={"Table " + (reservation.table?.size || 1)}
        height="140"
        image={`/imgs/table${reservation.table?.size || 1}.jpg`}
      />
      <CardContent>
        {/* <img src={img} alt=''/> */}
        <Typography gutterBottom variant="h5" component="div">
          {reservation.guest?.name || 'Guest'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This guest had made an appointment
          on {format(new Date(reservation.reservationTime), 'dd/MM/yyyy HH:mm')}
          at {format(new Date(reservation.createdTime), 'dd/MM/yyyy HH:mm')}.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">OK</Button>
        <Button size="small">Cancel</Button>
      </CardActions>
    </Card>
  );
}