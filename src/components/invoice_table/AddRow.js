import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import TextField from "./TextField";
import { getFormattedDate } from "./TableUtils";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useForm } from "../../hooks/useFrom";
import { convertArrayToObject } from "../../components/invoice_table/TableUtils";

import MuiButton, { buttonClasses } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
const Button = styled(MuiButton)(({ theme }) => ({
  "&:disabled": {
    borderColor: "#333333 !important",
  },
  [`&.${buttonClasses.root}`]: {
    color: theme.palette.text.main,
    border: "1px solid",
    borderColor: theme.palette.outline.main,
    width: "100%",
  },
}));
const FormTextField = ({ field, required, handleChange, err, helperText }) => {
  return required ? (
    <TextField
      sx={{
        width: "100%",
      }}
      required
      error={err}
      borderradiuscustom="8px"
      label={field.label}
      helperText={helperText}
      variant="filled"
      name={field.id}
      defaultValue={field.type === "date" ? getFormattedDate(new Date()) : ""}
      type={field.type}
      onChange={handleChange}
      InputProps={{ disableUnderline: true }}
    />
  ) : (
    <TextField
      sx={{
        width: "100%",
      }}
      borderradiuscustom="8px"
      label={field.label}
      variant="filled"
      error={field.type === "number"}
      helperText={field.type === "number" ? "required field" : ""}
      name={field.id}
      defaultValue={field.type === "date" ? getFormattedDate(new Date()) : ""}
      type={field.type}
      onChange={handleChange}
      InputProps={{ disableUnderline: true }}
    />
  );
};
const AddRow = (props) => {
  const fields = [
    {
      id: "business_code",
      label: "Business Code",
      type: "text",
    },

    {
      id: "cust_number",
      label: "Customer Number",
      type: "text",
    },
    {
      id: "clear_date",
      label: "Clear Date",
      type: "date",
    },
    {
      id: "buisness_year",
      label: "Business Year",
      type: "date",
    },
    {
      id: "doc_id",
      label: "Document Id",
      type: "text",
    },
    {
      id: "posting_date",
      label: "Posting Date",
      type: "date",
    },
    {
      id: "document_create_date",
      label: "Document Create Date",
      type: "date",
    },
    {
      id: "due_in_date",
      label: "Due Date",
      type: "date",
    },
    {
      id: "invoice_currency",
      label: "Invoice Currency",
      type: "text",
    },
    {
      id: "document_type",
      label: "Document Type",
      type: "text",
    },
    {
      id: "posting_id",
      label: "Posting Id",
      type: "text",
    },
    {
      id: "total_open_amount",
      label: "Total Open Amount",
      type: "number",
    },
    {
      id: "baseline_create_date",
      label: "Baseline Create Date",
      type: "date",
    },
    {
      id: "cust_payment_terms",
      label: "Customer Payment Terms",
      type: "text",
    },
    {
      id: "invoice_id",
      label: "Invoice Id",
      type: "text",
    },
  ];

  // const { open, fieldErrors, handleClose, handleOnAdd } = props;
  const { open, handleClose, handleOnAdd } = props;
  const initialData = convertArrayToObject(fields, "id");

  const [values, _handleChange, resetForm] = useForm(() => {
    let d = new Date();
    let year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const today = [year, month, day].join("-");
    const _data = convertArrayToObject(fields, "id", today);
    return _data;
  });

  const [errors, setErrors] = useState(initialData);

  const onHandleClose = () => {
    resetForm();
    setErrors(initialData);
    handleClose();
  };

  const handleChange = (e) => {
    _handleChange(e);
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
    if (!!e.target.value) {
    } else {
      const key = e.target.name;
      setErrors({
        ...errors,
        [key]: `${key} is reuired field`,
      });
    }
  };

  const handleOnSubmit = () => {
    console.log(values);
    handleOnAdd(values);
    onHandleClose();
  };

  return (
    <div>
      <Dialog
        autoComplete="off"
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={onHandleClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          Add
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              container
              rowSpacing={4}
              columnSpacing={3}
            >
              {fields.map((field, id) => (
                <Grid item xs={12} sm={5.5} md={4} lg={3} key={id}>
                  <FormTextField
                    field={field}
                    error={!!errors[field.id]}
                    helperText={!!errors[field.id] ? errors[field.id] : ""}
                    required={field.id !== "clear_date"}
                    handleChange={handleChange}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              container
              spacing={1}
            >
              <Grid item xs={6}>
                <Button
                  disabled={
                    Object.keys(initialData).filter((key) => {
                      if (!!values[key]) {
                        return false;
                      } else {
                        return true;
                      }
                    }).length > 0
                  }
                  onClick={handleOnSubmit}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={onHandleClose}>Cancel</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
AddRow.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnAdd: PropTypes.func.isRequired,
};
export default AddRow;
