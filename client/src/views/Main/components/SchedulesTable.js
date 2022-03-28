import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import pt from "date-fns/locale/pt";

function SchedulesTable(props) {
  const { scheduleStore, typeUser } = props;

  const { id } = useParams();

  const schedules =
    typeUser === 1 ? scheduleStore.schedules : scheduleStore.clientSchedules;

  useEffect(() => {}, [scheduleStore]);

  return (
    <Table>
      <TableContainer spacing={2}>
        <TableHead>
          <TableRow>
            {typeUser === 1 && (
              <TableCell style={headerTableStyle} align="left">
                Cliente
              </TableCell>
            )}
            <TableCell style={headerTableStyle} align="left">
              Barbeiro
            </TableCell>
            <TableCell style={headerTableStyle} align="left">
              Data
            </TableCell>
            <TableCell style={headerTableStyle} align="center">
              Horário
            </TableCell>
            {typeUser === 2 && (
              <TableCell style={headerTableStyle} align="center">
                Ação
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {schedules.map((row, index) => (
            <TableRow key={index}>
              {typeUser === 1 && (
                <TableCell>
                  <Typography variant="subtitle1">{row.user_name}</Typography>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="subtitle1">{row.barber_name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  {format(parseISO(row.date), "dd/MM/yyyy", { locale: pt })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="subtitle1">
                  {row.time}
                </Typography>
              </TableCell>
              {typeUser === 2 && (
                <TableCell>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() =>
                      scheduleStore.cancelSchedule(row.schedule_id, id)
                    }
                  >
                    Cancelar
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Table>
  );
}

const headerTableStyle = {
  color: "#3a84ff",
  fontWeight: "bold",
  fontSize: 20,
};

export default observer(SchedulesTable);
