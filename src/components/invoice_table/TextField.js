import MuiTextField, { textFieldClasses } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
const TextField = styled(MuiTextField)(({ theme, borderradiuscustom }) => ({
  "& label.Mui-focused": {
    color: theme.palette.focusBlue.main,
  },
  [`&.${textFieldClasses.root}`]: {
    color: theme.palette.searchInputText.main,
    backgroundColor: theme.palette.text.main,
    borderRadius: borderradiuscustom ?? 12,
  },
}));

export default TextField;
