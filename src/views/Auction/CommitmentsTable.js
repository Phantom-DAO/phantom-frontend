import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { useState } from "react";

const CommitmentsTable = ({ rows, account }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allOrMine, setAllOrMine] = useState("all");

  return (
    <Box
      sx={{
        marginTop: theme.spacing(2),
        "& .MuiTable-root": {
          marginTop: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          COMMITMENTS
        </Typography>
        <Box
          component={ButtonGroup}
          variant="text"
          size="small"
          sx={{
            "& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)": {
              borderRight: "none",
            },
          }}
        >
          <Button
            style={{
              color: allOrMine === "all" ? theme.palette.text.primary : theme.palette.text.secondary,
            }}
            onClick={() => setAllOrMine(allOrMine === "all" ? "mine" : "all")}
          >
            All
          </Button>
          <Button
            style={{
              color: allOrMine === "mine" ? theme.palette.text.primary : theme.palette.text.secondary,
            }}
            onClick={() => setAllOrMine(allOrMine === "all" ? "mine" : "all")}
          >
            Mine
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
        >
          <TableHead
            style={{
              backgroundColor: "#161429",
            }}
          >
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell align="right">Amount Committed</TableCell>
              <TableCell align="right">Claimable</TableCell>
              <TableCell align="right">Tx Hash</TableCell>
              <TableCell align="right">Block Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(allOrMine === "all"
              ? rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              : rowsPerPage > 0
              ? rows.filter(row => row.address === account).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows.filter(row => row.address === account)
            ).map((row, index) => (
              <TableRow key={`${index}-${row.address}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.address}
                </TableCell>
                <TableCell align="right">{row.amountCommitted} FRAX</TableCell>
                <TableCell align="right">{row.claimable} aPHM</TableCell>
                <TableCell align="right">{row.txHash}</TableCell>
                <TableCell align="right">{row.blockNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={allOrMine === "all" ? rows.length : rows.filter(row => row.address === account).length}
              page={page}
              onPageChange={(event, newPage) => {
                setPage(newPage);
              }}
              onRowsPerPageChange={event => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommitmentsTable;
