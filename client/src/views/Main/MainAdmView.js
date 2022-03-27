import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import SchedulesTable from "./components/SchedulesTable";
import SchedulesFilter from "./components/SchedulesFilter";

MainAdmView.propTypes = {
  loginStore: PropTypes.object.isRequired,
  scheduleStore: PropTypes.object.isRequired,
};

function MainAdmView(props) {
  const { loginStore, scheduleStore } = props;
  const { id } = useParams();
  let navigate = useNavigate();

  const logOut = () => {
    loginStore.reset();
    navigate(`/`);
  };

  useEffect(() => {
    loginStore.getAdminData(id, navigate);
    scheduleStore.getSchedules();
  }, [loginStore, scheduleStore, navigate, id]);

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

      <SchedulesFilter scheduleStore={scheduleStore} typeUser={1} />

      <SchedulesTable scheduleStore={scheduleStore} typeUser={1} />
    </div>
  );
}

const divTitle = {
  marginBottom: 10,
  marginRight: "60%",
  display: "flex",
  justifyContent: "space-between",
};

export default withStore(observer(MainAdmView));
