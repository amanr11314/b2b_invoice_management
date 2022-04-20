import Header from "./components/Header";
import Footer from "./components/Footer";
import InvoiceTable from "./components/invoice_table/InvoiceTable";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d4250",
    },
    secondary: {
      main: "#283d4a",
    },
    outline: {
      main: "#fff",
    },
    text: {
      main: "#fff",
    },
    link: {
      main: "#0d6efd",
    },
    focusBlue: {
      main: "#14aff1",
    },
    searchInputText: {
      main: "#616161",
    },
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <InvoiceTable />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
