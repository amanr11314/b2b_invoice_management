// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import TextField from "./TextField";
import Box from "@mui/material/Box";
import { useForm } from "../../hooks/useFrom";

import MuiButton, { buttonClasses } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
const Button = styled(MuiButton)(({ theme }) => ({
  [`&.${buttonClasses.root}`]: {
    color: theme.palette.text.main,
    border: "1px solid",
    borderColor: theme.palette.outline.main,
    width: "100%",
  },
}));

const EditRow = (props) => {
  const { open, handleClose, handleOnEdit } = props;
  const initialData = {
    cust_payment_terms: "",
    invoice_currency: "",
  };
  const [values, handleChange, resetForm] = useForm(initialData);

  const onHandleClose = () => {
    resetForm();
    handleClose();
  };

  const handleOnSubmit = () => {
    if (
      !!values.cust_payment_terms.trim() ||
      !!values.invoice_currency.trim()
    ) {
      handleOnEdit(values);
    }
    onHandleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onHandleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          Edit
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
              justifyContent="space-between"
              alignItems="center"
              container
              rowSpacing={4}
              columnSpacing={1}
            >
              <Grid item xs={5.5}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  borderradiuscustom="8px"
                  label="Invoice Currency"
                  variant="filled"
                  name="invoice_currency"
                  type="text"
                  onChange={handleChange}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
              <Grid item xs={5.5}>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  borderradiuscustom="8px"
                  label="Customer Payment Terms"
                  variant="filled"
                  name="cust_payment_terms"
                  type="text"
                  onChange={handleChange}
                  InputProps={{ disableUnderline: true }}
                />
              </Grid>
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
                <Button onClick={handleOnSubmit}>Edit</Button>
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
EditRow.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnEdit: PropTypes.func.isRequired,
};
export default EditRow;
