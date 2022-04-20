import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = ({ onOptionsChange, optionsList }) => {
  const theme = useTheme();

  const [selected, setSelected] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onOptionsChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        {selected.length === 0 && (
          <InputLabel id="demo-multiple-checkbox-label">
            Invoice Currency
          </InputLabel>
        )}
        <Select
          sx={{
            color: theme.palette.searchInputText.main,
            backgroundColor: theme.palette.text.main,
            borderRadius: "8px",
          }}
          multiple
          value={selected}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {optionsList.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selected.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
MultipleSelect.propTypes = {
  onOptionsChange: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
};
export default MultipleSelect;
