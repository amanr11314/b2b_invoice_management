import TableSortLabel, {
  tableSortLabelClasses,
} from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";
const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  [`&.${tableSortLabelClasses.root}`]: {
    color: theme.palette.text.main,
  },
  [`&.${tableSortLabelClasses.active}`]: {
    color: theme.palette.text.main,
  },
  //Note: Keep as & . notice space in between
  [`& .${tableSortLabelClasses.icon}`]: {
    color: `${theme.palette.text.main} !important`,
  },
}));
export default StyledTableSortLabel;
