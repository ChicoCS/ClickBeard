import React, { useEffect } from "react";
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

CreateAccountView.propTypes = {
  loginStore: PropTypes.object.isRequired,
};

function CreateAccountView(props) {
  const { loginStore } = props;

  let navigate = useNavigate();

  const createAccount = async () => {
  };

  const backToLogin = async () => {
    navigate("/");
  };

  useEffect(() => {}, []);

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
                    loginStore.handleChangeCreateAccount(target)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  size="small"
                  variant="standard"
                  type="email"
                  onChange={({ target }) =>
                    loginStore.handleChangeCreateAccount(target)
                  }
                />
              </Grid>
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
                    loginStore.handleChangeCreateAccount(target)
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
                    loginStore.handleChangeCreateAccount(target)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Confirme sua Senha</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  size="small"
                  variant="standard"
                  type="password"
                  onChange={({ target }) =>
                    loginStore.handleChangeCreateAccount(target)
                  }
                />
              </Grid>

              <Grid item xs={8}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={createAccount}
                >
                  Criar Conta
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  style={divButton}
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={backToLogin}
                >
                  Voltar
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

export default withStore(observer(CreateAccountView));
