import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer, PropTypes } from "mobx-react";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

// MainAdmView.propTypes = {
//   loginStore: PropTypes.object.isRequired,
// };

function MainAdmView(props) {

  let navigate = useNavigate();

  const registerBarber = () => {
    navigate("/barber/register");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard - ADM PAGE!</Typography>
        <Button size="small" color="primary" variant="contained" onClick={registerBarber}>
          Cadastrar Barbeiro
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

export default withStore(observer(MainAdmView));
