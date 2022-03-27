import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function SchedulesFilter(props) {
  const { scheduleStore, typeUser } = props;

  const { id } = useParams();
  let navigate = useNavigate();

  const schedule = () => {
    navigate(`/${id}/schedule/register`);
  };

  const registerBarber = () => {
    navigate(`/${id}/barber/register`);
  };

  const filter = async () => {
    if (typeUser === 1) {
      await scheduleStore.getSchedules();
    }
    if (typeUser === 2) {
      await scheduleStore.getSchedulesByClient(id);
    }
  };

  const clearFilter = async () => {
    if (typeUser === 1) {
      await scheduleStore.getSchedules();
    }
    if (typeUser === 2) {
      await scheduleStore.getSchedulesByClient(id);
    }
  };

  return (
    <Grid container spacing={1}>
      {typeUser === 1 && (
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={registerBarber}
          >
            Cadastrar Barbeiro
          </Button>
        </Grid>
      )}
      {typeUser === 2 && (
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={schedule}
          >
            Agendar Horário
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Filtro</Typography>
      </Grid>
      <Grid item xs={1.5}>
        <TextField
          required
          name="date"
          size="small"
          variant="standard"
          type="date"
          onChange={({ target }) =>
            scheduleStore.handleChangeFilterSchedules(target)
          }
        />
      </Grid>

      <Grid item xs={1}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={filter}
        >
          Filtrar
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={clearFilter}
        >
          Limpar Filtro
        </Button>
      </Grid>
    </Grid>
  );
}

export default observer(SchedulesFilter);
