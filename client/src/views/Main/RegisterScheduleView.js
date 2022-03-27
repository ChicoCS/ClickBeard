import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

RegisterScheduleView.propTypes = {
  barberStore: PropTypes.object.isRequired,
  scheduleStore: PropTypes.object.isRequired,
};

function RegisterScheduleView(props) {
  const { barberStore, scheduleStore } = props;
  const { client } = useParams();

  let navigate = useNavigate();

  const registerSchedule = () => {
    scheduleStore.registerSchedule(navigate, client);
  };

  const backToMain = async () => {
    scheduleStore.resetRegisterSchedule();
    navigate(`/client/${client}`);
  };

  useEffect(() => {
    barberStore.getBarberSpecialtiesTypes();
    scheduleStore.filterBarbersBySpecialty();
  }, [barberStore, scheduleStore]);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard</Typography>
      </div>
      <div style={divCard}>
        <Card sx={{ width: 600 }}>
          <CardHeader
            style={{ color: "#3a84ff" }}
            title="Realizar Agendamento"
          />

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Selecione uma data</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="date"
                  size="small"
                  variant="standard"
                  type="date"
                  onChange={({ target }) =>
                    scheduleStore.handleChangeRegisterSchedule(target)
                  }
                  InputProps={{ inputProps: { min: "2020-05-01" } }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 1.5 }}>
                <Typography variant="subtitle1">
                  Escolha uma Especialidade
                </Typography>
              </Grid>

              {barberStore.specialties.map((row, index) => (
                <Stack style={{ marginTop: 10 }} key={index} direction="row">
                  <Chip
                    id={row.name}
                    label={row.name}
                    name="specialty"
                    size="small"
                    variant="filled"
                    clickable={true}
                    color={
                      scheduleStore.schedule.specialty === row.id
                        ? "info"
                        : "default"
                    }
                    onClick={() =>
                      scheduleStore.handleChangeChipRegisterSchedule(
                        row,
                        "specialty"
                      )
                    }
                  />
                </Stack>
              ))}
              <Grid item xs={12} sx={{ marginTop: 1.5 }}>
                <Typography variant="subtitle1">
                  Barbeiros Disponíveis
                </Typography>
              </Grid>
              {scheduleStore.availableBarbers.length < 1 && (
                <Stack style={{ marginTop: 10 }} direction="row">
                  <Chip
                    label={"Nenhum Barbeiro"}
                    size="small"
                    variant="filled"
                  />
                </Stack>
              )}
              {scheduleStore.availableBarbers.length > 0 && (
                <>
                  {scheduleStore.availableBarbers.map((row, index) => (
                    <Stack
                      style={{ marginTop: 10 }}
                      key={index}
                      direction="row"
                    >
                      <Chip
                        id={row.name}
                        label={row.name}
                        size="small"
                        variant="filled"
                        clickable={true}
                        color={
                          scheduleStore.schedule.barber === row.uid
                            ? "info"
                            : "default"
                        }
                        onClick={() =>
                          scheduleStore.handleChangeChipRegisterSchedule(
                            row,
                            "barber"
                          )
                        }
                      />
                    </Stack>
                  ))}
                </>
              )}
              <Grid item xs={12} sx={{ marginTop: 1.5 }}>
                <Typography variant="subtitle1">
                  Horários Disponíveis
                </Typography>
              </Grid>
              {scheduleStore.availableSchedules.length < 1 && (
                <Stack style={{ marginTop: 10 }} direction="row">
                  <Chip
                    label={"Nenhum horário"}
                    size="small"
                    variant="filled"
                  />
                </Stack>
              )}
              {scheduleStore.availableSchedules.length > 0 && (
                <>
                  {scheduleStore.availableSchedules.map((row, index) => (
                    <Stack
                      style={{ marginTop: 10 }}
                      key={index}
                      direction="row"
                    >
                      <Chip
                        id={row.name}
                        label={row}
                        size="small"
                        variant="filled"
                        clickable={true}
                        color={
                          scheduleStore.schedule.time === row ? "info" : "default"
                        }
                        onClick={() =>
                          scheduleStore.handleChangeChipRegisterSchedule(
                            row,
                            "time"
                          )
                        }
                      />
                    </Stack>
                  ))}
                </>
              )}
              <Grid item xs={10}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={backToMain}
                >
                  Voltar
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={registerSchedule}
                >
                  Agendar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const divTitle = {
  marginBottom: 10,
  display: "flex",
  justifyContent: "flex-start",
};

const divCard = {
  display: "flex",
  alignSelf: "flex-start",
  justifyContent: "flex-start",
};

const divButton = {
  marginTop: 15,
  display: "flex",
};

export default withStore(observer(RegisterScheduleView));
