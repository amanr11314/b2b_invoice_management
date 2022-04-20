import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import { CChart } from "@coreui/react-chartjs";
import { CHART_COLORS } from "../../constants/Utils";
import Grid from "@mui/material/Grid";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AnalyticsViewWindow = (props) => {
  const { open, handleClose, analytics } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              my: 2,
            }}
          >
            <Grid item>Chart.js Bar Chart</Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              my: 2,
            }}
          >
            <Grid item>
              {open && (
                <Box
                  sx={{
                    width: 750,
                    height: 400,
                  }}
                >
                  <CChart
                    type="bar"
                    data={{
                      labels: analytics.analytics1.map(
                        (analysis) => analysis.business_name
                      ),
                      datasets: [
                        {
                          label: "No of Customers",
                          data: analytics.analytics1.map(
                            (analysis) => analysis.no_of_customers
                          ),
                          borderColor: CHART_COLORS.red,
                          backgroundColor: CHART_COLORS.red,
                        },
                        {
                          label: "Total Open Amount",
                          data: analytics.analytics1.map((analysis) => {
                            const amount = analysis.total_open_amount;
                            return amount;
                          }),
                          borderColor: CHART_COLORS.blue,
                          backgroundColor: CHART_COLORS.blue,
                        },
                      ],
                    }}
                    labels="Business Name"
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <Divider />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              my: 2,
            }}
          >
            <Grid item>Chart.js Pie Chart</Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              my: 2,
            }}
          >
            <Grid item>
              {open && (
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <CChart
                    type="pie"
                    data={{
                      labels: Object.keys(analytics.analytics2),
                      datasets: [
                        {
                          backgroundColor: [
                            CHART_COLORS.red,
                            CHART_COLORS.blue,
                          ],
                          data: Object.keys(analytics.analytics2).map(
                            (key) => analytics.analytics2[key]
                          ),
                        },
                      ],
                    }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
AnalyticsViewWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
};
export default AnalyticsViewWindow;
