import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";

MainClientView.propTypes = {
  loginStore: PropTypes.object,
};

function MainClientView(props) {
  const { loginStore } = props;
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loginStore.getClientData(id, navigate);
  }, [loginStore, navigate, id]);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard - CLIENT PAGE!</Typography>
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
