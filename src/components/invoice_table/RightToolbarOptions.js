import MuiButton, { buttonClasses } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
const Button = styled(MuiButton)(({ theme }) => ({
  "&:disabled": {
    borderColor: "#333333 !important",
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    color: theme.palette.text.main,
    backgroundColor: "transparent",
    borderColor: theme.palette.focusBlue.main,
  },

  [`&.${buttonClasses.root}`]: {
    color: theme.palette.text.main,
    borderColor: theme.palette.focusBlue.main,
  },
}));
const RightToolbarOptions = (props) => {
  const {
    rowsSelected,
    onAddButtonClick,
    onEditButtonClick,
    onDeleteButtonClick,
  } = props;

  return (
    <ButtonGroup>
      <Button
        onClick={(e) => {
          onAddButtonClick();
        }}
        value="add"
        aria-label="add"
      >
        ADD
      </Button>
      <Button
        onClick={(e) => {
          onEditButtonClick();
        }}
        disabled={rowsSelected !== 1}
        value="edit"
        aria-label="edit"
      >
        EDIT
      </Button>
      <Button
        onClick={(e) => {
          onDeleteButtonClick();
        }}
        disabled={rowsSelected === 0}
        value="delete"
        aria-label="delete"
      >
        DELETE
      </Button>
    </ButtonGroup>
  );
};

RightToolbarOptions.propTypes = {
  rowsSelected: PropTypes.number.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};
export default RightToolbarOptions;
