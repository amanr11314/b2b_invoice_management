import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import StyledTableCell from "./StyledTableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StyledTableSortLabel from "./StyledTableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";

const headCells = [
  {
    id: "sl_no",

    label: "Sl No",
  },
  {
    id: "business_code",

    label: "Business Code",
  },

  {
    id: "cust_number",

    label: "Customer Number",
  },
  {
    id: "clear_date",

    label: "Clear Date",
  },
  {
    id: "buisness_year",

    label: "Business Year",
  },
  {
    id: "doc_id",

    label: "Document Id",
  },
  {
    id: "posting_date",

    label: "Posting Date",
  },
  {
    id: "document_create_date",

    label: "Document Create Date",
  },
  {
    id: "due_in_date",

    label: "Due Date",
  },
  {
    id: "invoice_currency",

    label: "Invoice Currency",
  },
  {
    id: "document_type",

    label: "Document Type",
  },
  {
    id: "posting_id",

    label: "Posting Id",
  },
  {
    id: "total_open_amount",

    label: "Total Open Amount",
  },
  {
    id: "baseline_create_date",

    label: "Baseline Create Date",
  },
  {
    id: "cust_payment_terms",

    label: "Customer Payment Terms",
  },
  {
    id: "invoice_id",

    label: "Invoice Id",
  },
  {
    id: "aging_bucket",

    label: "Aging Bucket",
  },
  // {
  //   id: "isOpen",

  //   label: "Is Open",
  // },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "secondary.main",
        }}
      >
        <TableCell padding="checkbox">
          {/* when - sign on checkbox it fades fix this style  */}
          <Checkbox
            sx={{
              color: "outline.main",
              "&.Mui-checked": {
                color: "outline.main",
              },
              "&.indeterminate": {
                color: "outline.main",
              },
            }}
            indeterminateIcon={
              <IndeterminateCheckBoxIcon
                sx={{
                  color: "outline.main",
                }}
              />
            }
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              color="text.main"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
