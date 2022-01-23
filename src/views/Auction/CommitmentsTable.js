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

const CommitmentsTable = ({ commitments, myCommitments, tokenPrice }) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allOrMine, setAllOrMine] = useState("all");
  const rows = allOrMine === "all" ? commitments || [] : myCommitments || [];

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
              <TableCell align="left">Amount Committed</TableCell>
              <TableCell align="left">Claimable</TableCell>
              <TableCell align="left">Tx Hash</TableCell>
              <TableCell align="left">Block Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
              (row, index) => (
                <TableRow key={`${index}-${row.address}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.contributor.slice(0, 10)}...{row.contributor.slice(row.contributor.length - 8)}
                  </TableCell>
                  <TableCell align="left">{+row.amountCommited / 1e18} FRAX</TableCell>
                  <TableCell align="left">
                    {Math.round((+row.amountCommited / 1e18 / tokenPrice) * 100) / 100} aPHM
                  </TableCell>
                  <TableCell align="left">
                    {row.txHash.slice(0, 10)}...{row.txHash.slice(row.txHash.length - 8)}
                  </TableCell>
                  <TableCell align="left">{row.blockNumber}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 50, 100]}
              rowsPerPage={rowsPerPage}
              count={rows.length}
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
