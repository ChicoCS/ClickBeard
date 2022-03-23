import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { withStore } from "../../stores/context";

import Typography from "@mui/material/Typography";

// LoginView.propTypes = {
//   loginStore: PropTypes.object.isRequired,
// };

function MainClientView(props) {
  useEffect(() => {}, []);

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
