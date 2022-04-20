import SimpleButton from "@mui/material/Button";
import MuiButton, { buttonClasses } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const PredictButton = styled(MuiButton)(({ theme }) => ({
  "&:disabled": {
    borderColor: "#67aecd !important",
    backgroundColor: "#67aecd !important",
  },

  [`&.${buttonClasses.root}`]: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.focusBlue.main,
    borderColor: theme.palette.focusBlue.main,
    padding: "6px 24px",
  },
}));
const OtherLeftToolbarButton = styled(MuiButton)(({ theme }) => ({
  [`&.${buttonClasses.root}`]: {
    color: theme.palette.text.main,
    borderColor: theme.palette.focusBlue.main,
    padding: "6px 24px",
  },
}));
const LeftToolbarOptions = ({
  rowsSelected,
  handlePredictButtonClick,
  handleAdvanceSearchOpen,
  handleAnalyticsViewOpen,
  handleReload,
}) => {
  return (
    <div>
      <ButtonGroup color="text">
        <PredictButton
          disabled={rowsSelected === 0}
          value="predict"
          onClick={(e) => {
            if (rowsSelected > 0) {
              handlePredictButtonClick();
              console.log("clicked");
            }
          }}
        >
          PREDICT
        </PredictButton>
        <OtherLeftToolbarButton
          onClick={(e) => {
            handleAnalyticsViewOpen();
          }}
          value="analytics"
        >
          ANALYTICS VIEW
        </OtherLeftToolbarButton>
        <OtherLeftToolbarButton
          onClick={(e) => {
            handleAdvanceSearchOpen();
          }}
          value="search"
        >
          ADVANCE SEARCH
        </OtherLeftToolbarButton>
      </ButtonGroup>
      <SimpleButton
        sx={{
          mx: 1,
          backgroundColor: "transparent",
          border: "1px solid",
          borderColor: "focusBlue.main",
        }}
        onClick={(e) => {
          console.log("reload clicked");
          handleReload();
        }}
        value="reload"
        aria-label="reload grid"
      >
        <RefreshIcon
          sx={{
            color: "focusBlue.main",
          }}
        />
      </SimpleButton>
    </div>
  );
};
LeftToolbarOptions.propTypes = {
  rowsSelected: PropTypes.number.isRequired,
  handlePredictButtonClick: PropTypes.func.isRequired,
  handleAdvanceSearchOpen: PropTypes.func.isRequired,
  handleAnalyticsViewOpen: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
};
export default LeftToolbarOptions;
