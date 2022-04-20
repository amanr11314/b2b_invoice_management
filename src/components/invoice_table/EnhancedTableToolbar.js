import Toolbar from "@mui/material/Toolbar";
import TextField from "./TextField";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LeftToolbarOptions from "./LeftToolbarOptions";
import RightToolbarOptions from "./RightToolbarOptions";
const EnhancedTableToolbar = (props) => {
  const {
    onCustomerIdSearch,
    handleOnClearSearchBox,
    rowsSelected,
    onAddButtonClick,
    onEditButtonClick,
    onDeleteButtonClick,
    handlePredictButtonClick,
    handleAdvanceSearchOpen,
    handleAnalyticsViewOpen,
    handleReload,
  } = props;
  const [searchText, setSearchText] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchText.trim().length) {
        //when non empty then only search
        onCustomerIdSearch(searchText);
      }
    }
  };
  const handleOnSearchInputChange = (e) => {
    setSearchText(e.target.value);
    if (!!searchText.trim()) handleOnClearSearchBox();
  };

  return (
    <Toolbar
      sx={{
        bgcolor: "secondary.main",
        p: 2,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          container
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={5}>
            <LeftToolbarOptions
              rowsSelected={rowsSelected}
              handlePredictButtonClick={handlePredictButtonClick}
              handleAdvanceSearchOpen={handleAdvanceSearchOpen}
              handleAnalyticsViewOpen={handleAnalyticsViewOpen}
              handleReload={handleReload}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <TextField
              label="Search Customer Id"
              variant="filled"
              type="search"
              onKeyDown={handleKeyDown}
              onChange={handleOnSearchInputChange}
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <RightToolbarOptions
              rowsSelected={rowsSelected}
              onAddButtonClick={onAddButtonClick}
              onEditButtonClick={onEditButtonClick}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          </Grid>
        </Grid>
      </Box>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  rowsSelected: PropTypes.number.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  handlePredictButtonClick: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCustomerIdSearch: PropTypes.func.isRequired,
  handleOnClearSearchBox: PropTypes.func.isRequired,
  handleAdvanceSearchOpen: PropTypes.func.isRequired,
  handleAnalyticsViewOpen: PropTypes.func.isRequired,
  handleReload: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
