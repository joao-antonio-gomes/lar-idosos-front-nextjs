import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Divider from '@mui/material/Divider';

export default function TreatmentCard({ treatment }) {
  return (
    <Card sx={{ width: 250, height: 220 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div">
          {treatment.disease}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom>
          {moment(treatment.beginDate).format('DD/MM/YYYY')} - {moment(treatment.endDate).format('DD/MM/YYYY')}
        </Typography>
        <div className="mt-3 overflow-y-auto h-32">
          {treatment.medsTreatment.length > 0 ? (
            treatment.medsTreatment.map((med, index) => (
              <>
                <Divider />
                <Typography
                  variant="body2"
                  className="py-1">
                  {med.medicine.name} - {med.medicine.concentration}mg
                  <br />
                  {med.dosage} {med.dosageType} - A cada {med.hourInterval} horas
                </Typography>
                {index === treatment.medsTreatment.length - 1 ? <Divider /> : ''}
              </>
            ))
          ) : (
            <Typography variant="body2">Sem medicamentos para esse tratamento.</Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
