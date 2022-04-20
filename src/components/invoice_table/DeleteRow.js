// import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

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

const DeleteRow = (props) => {
  const { open, handleClose, handleOnDelete } = props;

  const handleOnSubmit = () => {
    if (true) {
      handleOnDelete();
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          Delete Records ?
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "primary.main",
            color: "text.main",
          }}
        >
          Are you sure you want to delete these record[s] ?
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
                <Button onClick={handleClose}>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleOnSubmit}>Delete</Button>
              </Grid>
            </Grid>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};
DeleteRow.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};
export default DeleteRow;
