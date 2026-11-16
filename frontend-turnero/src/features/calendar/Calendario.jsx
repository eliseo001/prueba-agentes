import React from 'react';
import { Grid, Box } from '@mui/material';

const Calendario = () => {
  const horas = Array.from({ length: 12 }, (_, i) => `0${i + 9}:00`);
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        {diasSemana.map((dia, index) => (
          <Box key={index} display="flex" alignItems="center">
            {dia}
          </Box>
        ))}
      </Grid>
      {horas.map((hora, index) => (
        <Grid container spacing={0.5}>
          <Grid item xs={1}>
            {hora}
          </Grid>
          {diasSemana.map(() => (
            <Grid item xs={1} border="1px solid #ccc" />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default Calendario;