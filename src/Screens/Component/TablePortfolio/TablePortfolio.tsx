import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDeleteOutline } from "react-icons/md";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Pagination, Switch } from "@mui/material";
import "./TablePortfolio.css";
const TablePortfolio = () => {
  const [active, setActive] = useState(false);

  const handleSwitchChange = () => {
    setActive(!active);
  };
  function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("", "02/12/2022", "Flamingo", "FCG3Vbjh6ugy83....GbV", 4.0),
    createData(
      "02/12/2022",
      "02/12/2022",
      "Flamingo",
      "FCG3Vbjh6ugy83....GbV",
      4.3
    ),
    createData(
      "02/12/2022",
      "02/12/2022",
      "Flamingo",
      "FCG3Vbjh6ugy83....GbV",
      6.0
    ),
    createData(
      "02/12/2022",
      "02/12/2022",
      "Flamingo",
      "FCG3Vbjh6ugy83....GbV",
      4.3
    ),
    createData(
      "02/12/2022",
      "02/12/2022",
      "Flamingo",
      "FCG3Vbjh6ugy83....GbV",
      3.9
    ),
  ];

  return (
    <div style={{ width: "80%" }}>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{ background: "var(--neutral-10, #262626)" }}
              sx={{
                "& td, & th": {
                  borderBottom: "none", // Change border color to grey
                },
              }}
            >
              <p>&nbsp;&nbsp;&nbsp;&nbsp; </p>
              <TableCell
                style={{
                  color: "var(--primary-1, #EFF5E6)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Date
              </TableCell>
              <TableCell
                style={{
                  color: "var(--primary-1, #EFF5E6)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Type
              </TableCell>
              <TableCell
                style={{
                  color: "var(--primary-1, #EFF5E6)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  color: "var(--primary-1, #EFF5E6)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  color: "var(--primary-1, #EFF5E6)",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                |&nbsp;&nbsp;&nbsp;&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ background: "var(--neutral-11, #1F1F1F)" }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                  "& td, & th": {
                    borderBottom: "1px solid var(--neutral-8, #595959)", // Change border color to grey
                  },
                }}
              >
                <p></p>
                <TableCell
                  style={{
                    color: "var(--character-primary-inverse, #FFF)",
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                  }}
                >
                  {row.calories}
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--character-primary-inverse, #FFF)",
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                  }}
                >
                  {row.fat}
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--character-primary-inverse, #FFF)",
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                  }}
                >
                  {row.carbs}
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--character-primary-inverse, #FFF)",
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={active}
                        onChange={handleSwitchChange}
                        name="activeSwitch"
                        style={{
                          color: "var(--character-primary-inverse, #FFF)",
                        }}
                      />
                    }
                    label={active ? "Active" : "Non-Active"}
                    labelPlacement="end" // Place the label on the right side
                  />
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--character-primary-inverse, #FFF)",
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                    fontSize: "20px",
                  }}
                >
                  <MdDeleteOutline />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={5}
        shape="rounded"
        style={{
          marginTop: "3%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      />
    </div>
  );
};

export default TablePortfolio;
