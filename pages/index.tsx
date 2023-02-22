import Grid2 from "@mui/material/Unstable_Grid2";
import { Card } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [aplicacoesRealizadas, setAplicacoesRealizadas] = useState([]);
  const [proximasAplicacoes, setProximasAplicacoes] = useState([]);
  const [aplicacoesAtrasadas, setAplicacoesAtrasadas] = useState([]);

  return (
    <Grid2 container spacing={2} justifyContent={'center'}>
      <Grid2 xs={3}>
        <Card sx={{backgroundColor: 'success.light', color: 'white', borderRadius: '4px 4px 0px 0px'}} className='text-center'>Ultimas aplicações realizadas</Card>
        {aplicacoesRealizadas.length < 1 ?
          <Card sx={{borderRadius: '0px'}} className='text-center'>Não foram encontradas aplicações realizadas.</Card>
        :
          aplicacoesRealizadas.map((aplicacao, index) => {
            if (index === aplicacoesRealizadas.length - 1) {
              return (
                <Card sx={{borderRadius: '0px 0px 4px 4px'}} className='text-center'>{aplicacao}</Card>
              )
            }

            return (
              <Card sx={{borderRadius: '0px'}} className='text-center'>{aplicacao}</Card>
            );
          })}
      </Grid2>
      <Grid2 xs={3}>
        <Card sx={{backgroundColor: 'primary.light', color: 'white', borderRadius: '4px 4px 0px 0px'}} className='text-center'>Próximas aplicações a realizar</Card>
        {proximasAplicacoes.length < 1 ?
          <Card sx={{borderRadius: '0px'}} className='text-center'>Não foram encontradas próximas aplicações.</Card>
          :
          proximasAplicacoes.map((aplicacao, index) => {
            if (index === proximasAplicacoes.length - 1) {
              return (
                <Card sx={{borderRadius: '0px 0px 4px 4px'}} className='text-center'>{aplicacao}</Card>
              )
            }

            return (
              <Card sx={{borderRadius: '0px'}} className='text-center'>{aplicacao}</Card>
            );
          })}
      </Grid2>
      <Grid2 xs={3}>
        <Card sx={{backgroundColor: 'error.light', color: 'white', borderRadius: '4px 4px 0px 0px'}} className='text-center'>Aplicações atrasadas</Card>
        {aplicacoesAtrasadas.length < 1 ?
          <Card sx={{borderRadius: '0px'}} className='text-center'>Não foram encontradas aplicações atradas.</Card>
          :
          aplicacoesAtrasadas.map((aplicacao, index) => {
            if (index === aplicacoesAtrasadas.length - 1) {
              return (
                <Card sx={{borderRadius: '0px 0px 4px 4px'}} className='text-center'>{aplicacao}</Card>
              )
            }

            return (
              <Card sx={{borderRadius: '0px'}} className='text-center'>{aplicacao}</Card>
            );
          })}
      </Grid2>
    </Grid2>
  );
}
