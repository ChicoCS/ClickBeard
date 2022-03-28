import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";

LoginView.propTypes = {
  loginStore: PropTypes.object.isRequired,
};

function LoginView(props) {
  const { loginStore } = props;

  let navigate = useNavigate();

  const login = async () => {
    await loginStore.makeLogin(navigate);
  };

  const createAccount = () => {
    navigate("/createAccount");
  };

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard</Typography>
      </div>
      <div style={divCard}>
        <Card sx={{ minWidth: 260, marginRight: "40%", marginLeft: "40%" }}>
          <CardHeader style={{ color: "#3a84ff" }} title="Login" />

          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Usuário</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="login"
                  size="small"
                  variant="standard"
                  type="text"
                  onChange={({ target }) =>
                    loginStore.handleChangeLogin(target)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Senha</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  size="small"
                  variant="standard"
                  type="password"
                  onChange={({ target }) =>
                    loginStore.handleChangeLogin(target)
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={createAccount}
                >
                  Criar Nova Conta
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={login}
                >
                  Entrar
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
  justifyContent: "center",
};

const divCard = {
  display: "flex",
  alignSelf: "center",
  justifyContent: "center",
};

const divButton = {
  marginTop: 15,
  display: "flex",
};

export default withStore(observer(LoginView));
