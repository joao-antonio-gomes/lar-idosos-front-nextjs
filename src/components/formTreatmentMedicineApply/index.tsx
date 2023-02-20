import React, { useEffect, useState } from 'react';
import TreatmentMedicines from '../../interface/TreatmentMedicines';
import dayjs from 'dayjs';
import { Card } from '@mui/material';
import MedicineApplication from '../../interface/MedicineApplication';
import CheckboxMedicineApplication from '../checkboxMedicineApplication';

interface Props {
  treatmentMedicine: TreatmentMedicines;
}

const FormTreatmentMedicineApply = ({ treatmentMedicine }: Props) => {
  const [applicationsDay, setApplicationsDay] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let days: any = {};

    treatmentMedicine.medicineApplications = treatmentMedicine.medicineApplications.sort((a: MedicineApplication, b: MedicineApplication) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf());

    treatmentMedicine.medicineApplications.map(application => {
      const day = dayjs(application?.date).format('YYYY-MM-DD');
      if (!days[day as keyof typeof days]) {
        days[day as keyof typeof days] = [application];
        return;
      }
      days[day as keyof typeof days].push(application);
    });
    setApplicationsDay(days);
  }, []);

  useEffect(() => {
    if (Object.keys(applicationsDay).length === 0) {
      return;
    }
    setIsLoaded(true);
  }, [applicationsDay]);

  const mountApplicationsDayCheckBox = () => {
    return (
      <div className={'pb-2 pt-2 flex w-full flex-wrap'}>
        {Object.keys(applicationsDay).map((day, index) => {
          return (
            <Card className={'p-2 mr-10 mb-5'} key={index}>
              {dayjs(day).format('DD/MM/YYYY')}
              {applicationsDay[day as keyof typeof applicationsDay].map((application: MedicineApplication) =>
                <CheckboxMedicineApplication application={application} key={application.id} />)}
            </Card>
          );
        })
        }
      </div>
    );
  };

  return (
    <>
      {!isLoaded ?
        <></>
        :
        <>
          {mountApplicationsDayCheckBox()}
        </>
      }
    </>
  );
};

export default FormTreatmentMedicineApply;
