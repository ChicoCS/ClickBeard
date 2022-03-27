import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import SchedulesTable from "./components/SchedulesTable";
import SchedulesFilter from "./components/SchedulesFilter";

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

  let navigate = useNavigate();

  useEffect(() => {
    loginStore.getClientData(id, navigate);
    scheduleStore.getSchedulesByClient(id);
  }, [loginStore, barberStore, scheduleStore, navigate, id]);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">{`Click Beard`}</Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={logOut}
        >
          Sair
        </Button>
      </div>

      <SchedulesFilter scheduleStore={scheduleStore} typeUser={2} />

      <SchedulesTable scheduleStore={scheduleStore} typeUser={2} />
    </div>
  );
}

const divTitle = {
  marginBottom: 10,
  marginRight: "60%",
  display: "flex",
  justifyContent: "space-between",
};

export default withStore(observer(MainClientView));
