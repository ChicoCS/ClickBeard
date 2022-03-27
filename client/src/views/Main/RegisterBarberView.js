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

RegisterBarberView.propTypes = {
  barberStore: PropTypes.object.isRequired,
};

function RegisterBarberView(props) {
  const { barberStore } = props;
  const { admin } = useParams();

  let navigate = useNavigate();

  const registerBarber = () => {
    barberStore.registerBarber(admin, navigate);
  };

  const backToMain = async () => {
    barberStore.resetRegisterBarber();
    navigate(`/adm/${admin}`);
  };

  useEffect(() => {
    barberStore.getBarberSpecialtiesTypes();
    barberStore.resetRegisterBarber()
  }, [barberStore]);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard</Typography>
      </div>
      <div style={divCard}>
        <Card sx={{ width: 600 }}>
          <CardHeader style={{ color: "#3a84ff" }} title="Registrar Barbeiro" />

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Nome</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  size="small"
                  variant="standard"
                  type="text"
                  onChange={({ target }) =>
                    barberStore.handleChangeRegisterBarber(target)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Idade</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  size="small"
                  variant="standard"
                  type="number"
                  onChange={({ target }) =>
                    barberStore.handleChangeRegisterBarber(target)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Data da Contratação</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="date_hiring"
                  size="small"
                  variant="standard"
                  type="date"
                  onChange={({ target }) =>
                    barberStore.handleChangeRegisterBarber(target)
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 1.5 }}>
                <Typography variant="subtitle1">Especialidades</Typography>
              </Grid>
              {barberStore.specialties.map((row, index) => (
                <Stack style={{ marginTop: 10 }} key={index} direction="row">
                  <Chip
                    label={row.name}
                    size="small"
                    variant="filled"
                    clickable={true}
                    color={barberStore.selectedChipRegisterBarber(row)}
                    onClick={() =>
                      barberStore.handleChangeChipRegisterBarberSpecialties(row)
                    }
                  />
                </Stack>
              ))}
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
                  onClick={registerBarber}
                >
                  Registrar
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

export default withStore(observer(RegisterBarberView));
