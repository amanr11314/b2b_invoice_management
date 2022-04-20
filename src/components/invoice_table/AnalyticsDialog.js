import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import TextField from "./TextField";
import Box from "@mui/material/Box";
import { useForm } from "../../hooks/useFrom";
// import { useState } from "react";
import { getFormattedDate } from "./TableUtils";
import MultipleSelect from "./MultipleSelect";
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

const AnalyticsDialog = (props) => {
  const { open, handleClose, handleOnSubmitAnalyticsForm } = props;

  const [values, handleChange, resetForm] = useForm(() => {
    let d = new Date();
    let year = `${d.getFullYear()}`;
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const today = [year, month, day].join("-");
    return {
      clear_date_from: today,
      clear_date_to: today,
      due_date_from: today,
      due_date_to: today,
      baseline_create_date_from: today,
      baseline_create_date_to: today,
      invoice_currencies: [],
    };
  });

  // useStae

  const onHandleClose = () => {
    resetForm();
    handleClose();
  };

  const handleOnSubmit = () => {
    handleOnSubmitAnalyticsForm(values);
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={onHandleClose}
      >
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          Analytics View
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
              container
              spacing={1}
            >
              <Grid container direction="column" spacing={1.5} item sm={6}>
                {/* first column components */}
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Clear Date
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="From"
                    variant="filled"
                    name="clear_date_from"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="To"
                    variant="filled"
                    name="clear_date_to"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" item spacing={1.5} sm={6}>
                {/* second column components */}
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Due Date
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="From"
                    variant="filled"
                    name="due_date_from"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="To"
                    variant="filled"
                    name="due_date_to"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              direction="row"
              justifyContent="space-between"
              container
              mt={2}
              spacing={1}
            >
              <Grid container direction="column" spacing={1.5} item sm={6}>
                {/* first column components */}
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Baseline Create Date
                  </Typography>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="From"
                    variant="filled"
                    name="baseline_create_date_from"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    borderradiuscustom="8px"
                    label="To"
                    variant="filled"
                    name="baseline_create_date_to"
                    type="date"
                    defaultValue={getFormattedDate(new Date())}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" item spacing={1.5} sm={6}>
                {/* second column components */}
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Invoice Currency
                  </Typography>

                  <MultipleSelect
                    optionsList={["USD", "CAD"]}
                    onOptionsChange={(selected) => {
                      const e = {
                        target: {
                          name: "invoice_currencies",
                          value: selected,
                        },
                      };
                      handleChange(e);
                    }}
                  />
                </Grid>
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
                <Button onClick={handleOnSubmit}>Submit</Button>
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
AnalyticsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnSubmitAnalyticsForm: PropTypes.func.isRequired,
};
export default AnalyticsDialog;
