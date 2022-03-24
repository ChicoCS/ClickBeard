import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";

// LoginView.propTypes = {
//   loginStore: PropTypes.object.isRequired,
// };

function MainAdmView(props) {
  useEffect(() => {}, []);

  return (
    <div>
      <div style={divTitle}>
        <Typography variant="h4">Click Beard - ADM PAGE!</Typography>
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
