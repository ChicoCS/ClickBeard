import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

MainClientView.propTypes = {
  loginStore: PropTypes.object.isRequired,
  barberStore: PropTypes.object.isRequired,
  scheduleStore: PropTypes.object.isRequired,
};

function MainClientView(props) {
  const { loginStore, barberStore, scheduleStore } = props;
  const { id } = useParams();
  
  const logOut = () => {
    loginStore.reset();
    navigate(`/`);
  };

  const schedule = () => {
    navigate(`/${id}/schedule/register`);
  }

  let navigate = useNavigate();

  useEffect(() => {
    loginStore.getClientData(id, navigate);
    scheduleStore.getSchedulesByClient(id)
  }, [loginStore, barberStore, scheduleStore, navigate, id]);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard - CLIENT PAGE!</Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={schedule}
        >
          Agendar Horário
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={logOut}
        >
          Sair
        </Button>

      </div>
    </div>
  );
}

const divTitle = {
  marginBottom: 10,
  display: "flex",
  justifyContent: "center",
};

export default withStore(observer(MainClientView));
