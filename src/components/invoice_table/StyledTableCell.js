import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.text.main,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.text.main,
    padding: "6px 0px",
  },
}));
export default StyledTableCell;
