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

const AdvanceSearch = (props) => {
  const { open, handleClose, handleOnSearch } = props;
  // const initialData = {
  //   doc_id: "",
  //   invoice_id: "",
  //   cust_number: "",
  //   buisness_year: "",
  // };
  const [values, handleChange, resetForm] = useForm(() => {
    let d = new Date();
    let year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const today = [year, month, day].join("-");
    return {
      doc_id: "",
      invoice_id: "",
      cust_number: "",
      buisness_year: today,
    };
  });

  const onHandleClose = () => {
    resetForm();
    handleClose();
  };

  const handleOnSubmit = () => {
    if (
      !!values.doc_id.trim() ||
      !!values.invoice_id.trim() ||
      !!values.cust_number.trim() ||
      !!values.buisness_year.trim()
    ) {
      handleOnSearch(values);
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
          Advance Search
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
                  label="Document ID"
                  variant="filled"
                  name="doc_id"
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
                  label="Invoice Id"
                  variant="filled"
                  name="invoice_id"
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
                  label="Customer Number"
                  variant="filled"
                  name="cust_number"
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
                  label="Business Year"
                  variant="filled"
                  name="buisness_year"
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
                <Button onClick={handleOnSubmit}>Search</Button>
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
AdvanceSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnSearch: PropTypes.func.isRequired,
};
export default AdvanceSearch;
