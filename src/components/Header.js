import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HRCLogo from "../resources/HRC-white-logo.svg";
import ABCProductsLogo from "../resources/ABC-Products-white-logo.svg";
const Header = () => {
  return (
    <Box
      sx={{
        height: window.innerWidth <= 900 ? 120 : 100,
        bgcolor: "primary.main",
        pt: 2,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <img src={ABCProductsLogo} alt="ABC Products logo" loading="lazy" />
        </Grid>
        <Grid item>
          <img src={HRCLogo} alt="highradius logo" loading="lazy" />
        </Grid>

        {window.innerWidth > 900 && (
          <Grid item sx={{ visibility: "hidden" }}>
            <img
              src={HRCLogo}
              alt="highradius logo png"
              loading="lazy"
              height={48}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default Header;
