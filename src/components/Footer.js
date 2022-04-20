import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      sx={{
        // height: 100,
        bgcolor: "primary.main",
        py: 2,
      }}
    >
      <Grid
        container
        sx={{
          color: "text.main",
        }}
        justifyContent="center"
      >
        <Link href="#" color="link.main" underline="always">
          Privacy Policy.
        </Link>
        | © 2022 HighRadius Corporation. All rights reserved.
      </Grid>
    </Box>
  );
};

export default Footer;
