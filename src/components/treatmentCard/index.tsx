import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import TreatmentGet from '../../interface/TreatmentGet';
import { TreatmentStatus } from '../../interface/TreatmentStatus';
import { Chip } from '@mui/material';

interface Props {
  treatment: TreatmentGet;
}

export default function TreatmentCard({ treatment }: Props) {
  return (
    <Card sx={{ width: 250, height: 130 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div">
          {treatment.disease.name}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom>
          {moment(treatment.beginDate).format('DD/MM/YYYY')} - {moment(treatment.endDate).format('DD/MM/YYYY')}
        </Typography>
        <div className="mt-3 overflow-y-auto h-32">
          {/*@ts-ignore*/}
          <Chip label={TreatmentStatus[treatment.status].name} color={TreatmentStatus[treatment.status].color} />
        </div>
      </CardContent>
    </Card>
  );
}
