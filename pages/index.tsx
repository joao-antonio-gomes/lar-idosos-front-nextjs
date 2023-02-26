import Grid2 from '@mui/material/Unstable_Grid2';
import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import MedicineApplicationService from '../src/service/MedicineApplicationService';
import MedicineApplication from '../src/interface/MedicineApplication';
import { abreviaNomePaciente } from '../src/service/Utils';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Props {
  medicineApplication: MedicineApplication;
  isLast?: boolean;
}

function MedicineApplicationCardHomePage({ medicineApplication, isLast = false }: Props) {
  const nomeRemedio = medicineApplication.treatmentMedicine.medicine.name;
  const nomePaciente = medicineApplication.treatmentMedicine.treatment.patient.name;
  const nomeDoenca = medicineApplication.treatmentMedicine.treatment.disease.name;
  const dataAplicacao = dayjs(medicineApplication.date).format('DD/MM/YYYY');
  const horaAplicacao = medicineApplication.hour;
  const linkTratamento = `/paciente/${medicineApplication.treatmentMedicine.treatment.patient.id}/tratamento/${medicineApplication.treatmentMedicine.treatment.id}`
  return (
    <Card sx={{ padding: '5px 0px', borderRadius: isLast ? '0px 0px 4px 4px' : '0px 0px 0px 0px' }}
          className='text-center flex justify-between items-center'>
      <div className='ml-20'>{abreviaNomePaciente(nomePaciente)} - {nomeDoenca} - {nomeRemedio} - {dataAplicacao} - {horaAplicacao}</div>
      <Link href={linkTratamento}><Button className='mr-10' size='small' variant={'contained'}>Tratamento</Button></Link>
    </Card>
  );
}

export default function Home() {
  const [proximasAplicacoes, setProximasAplicacoes] = useState<MedicineApplication[]>([]);
  const [aplicacoesAtrasadas, setAplicacoesAtrasadas] = useState<MedicineApplication[]>([]);

  useEffect(() => {
    MedicineApplicationService.getByStatus()
      .then((response) => {
        setProximasAplicacoes(response.data.toBeApplied);
        setAplicacoesAtrasadas(response.data.lated);
      });
  }, []);


  return (
    <Grid2 container spacing={4} justifyContent={'space-evenly'}>
      <Grid2 xs={5}>
        <Card sx={{ backgroundColor: 'error.light', color: 'white', borderRadius: '4px 4px 0px 0px' }}
              className='text-center'>Aplicações atrasadas</Card>
        {aplicacoesAtrasadas.length < 1 ?
          <Card sx={{ borderRadius: '0px' }} className='text-center'>Não foram encontradas aplicações atradas.</Card>
          :
          aplicacoesAtrasadas.map((aplicacao, index) => {
            if (index === aplicacoesAtrasadas.length - 1) {
              return (
                <MedicineApplicationCardHomePage medicineApplication={aplicacao} isLast={true} />
              );
            }

            return (
              <MedicineApplicationCardHomePage medicineApplication={aplicacao} />
            );
          })}
      </Grid2>
      <Grid2 xs={5}>
        <Card sx={{ backgroundColor: 'primary.light', color: 'white', borderRadius: '4px 4px 0px 0px' }}
              className='text-center'>Próximas aplicações a realizar</Card>
        {proximasAplicacoes.length < 1 ?
          <Card sx={{ borderRadius: '0px' }} className='text-center'>Não foram encontradas próximas aplicações.</Card>
          :
          proximasAplicacoes.map((aplicacao, index) => {
            if (index === proximasAplicacoes.length - 1) {
              return (
                <MedicineApplicationCardHomePage medicineApplication={aplicacao} isLast={true} />
              );
            }

            return (
              <MedicineApplicationCardHomePage medicineApplication={aplicacao} />
            );
          })}
      </Grid2>
    </Grid2>
  );
}
