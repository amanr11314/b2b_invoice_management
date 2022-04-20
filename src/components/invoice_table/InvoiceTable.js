import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import StyledTableCell from "./StyledTableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Paper from "@mui/material/Paper";
import EnhancedTableHead from "./EnhancedTableHead";
import { filterData, getComparator, stableSort } from "./TableUtils";
import AdvanceSearch from "./AdvanceSearch";
import AnalyticsDialog from "./AnalyticsDialog";
import AnalyticsViewWindow from "./AnalyticsViewWindow";
import AddRow from "./AddRow";
import EditRow from "./EditRow";
import DeleteRow from "./DeleteRow";
export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("sl_no");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [5, 10, 25];
  const [records, setInvoice_records] = useState([]);
  // without state management here we go prop-drilling
  /// To manage open and close of dialog AdvanceSearch, Add, Edit, Delete
  const [isAdvanceSearchDialogOpen, setAdvanceSearchDialogOpen] =
    useState(false);
  const [isAnalyticsViewDialogOpen, setAnalyticsViewDialogOpen] =
    useState(false);
  const [isAnalyticsViewWindowOpen, setAnalyticsViewWindowOpen] =
    useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const [total, setTotal] = useState(0);
  const [searchTextEntry, setSearchTextEntry] = useState("");
  const [advanceSearchParams, setAdvanceSearchParams] = useState({});
  const [isPredicting, setIsPredicting] = useState(false);
  const [selected_record_list, setSelected_record_list] = useState([]);
  const [analyticsParameters, setAnalyticsParameters] = useState({});
  // const [prediction, setPrediction] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [addParams, setAddParams] = useState({});
  const [editParams, setEditParams] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    records.length < rowsPerPage ? rowsPerPage - records.length : 0;

  // for fetch and SearchBox (Customer Id) and Advance Search
  useEffect(() => {
    const fetchInvoiceRecordsAPI = async (params) => {
      const URL = `http://localhost:8080/HRC20172W-back_end/Fetch?page=${params.page}&limit=${params.limit}&q=${params.searchTextEntry}`;

      const res = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const records = res.data.data.fetch_data;
      setInvoice_records(filterData(records));
      setTotal(res.data.data.total);
    };
    const advanceSearchInvoiceRecordsAPI = async (params) => {
      const URL = "http://127.0.0.1:8080/HRC20172W-back_end/Search";
      const res = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      });

      const records = res.data.data.fetch_data;
      setInvoice_records(filterData(records));
      setTotal(res.data.data.total);
    };
    if (!!Object.keys(advanceSearchParams).length) {
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        ...advanceSearchParams,
      };
      advanceSearchInvoiceRecordsAPI(params);
    } else {
      const params = {
        searchTextEntry: searchTextEntry,
        page: page + 1,
        limit: rowsPerPage,
      };
      fetchInvoiceRecordsAPI(params);
    }
  }, [page, refreshKey, rowsPerPage, searchTextEntry, advanceSearchParams]);

  // for Prediction
  useEffect(() => {
    const predictAPI = async (data) => {
      const URL = "http://localhost:5000/get_prediction";

      const res = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let response = res.data;
      let recordsNew = records;

      response.forEach((p) => {
        let idx = recordsNew.findIndex((record, id) => {
          let doc_id = record["doc_id"];
          let p_doc_id = parseInt(p["doc_id"]);
          p_doc_id = Math.trunc(p_doc_id) + "";
          return p_doc_id === doc_id;
        });
        if (idx !== -1) {
          let obj = recordsNew[idx];

          obj["clear_date"] = p.clear_date;
          obj["aging_bucket"] = p.aging_bucket;
          recordsNew[idx] = obj;
        }
      });

      setIsPredicting(false);
      setSelected_record_list([]);
      setSelected([]);
    };
    if (isPredicting && selected.length > 0) {
      const data = selected_record_list.map((record) =>
        parseInt(record["doc_id"])
      );
      const dataObj = {
        data,
      };

      predictAPI(dataObj);
    }
  }, [isPredicting, records, selected, selected_record_list]);

  //reload useffect
  useEffect(() => {}, [records]);
  // for analytics view
  useEffect(() => {
    const analyticsViewAPI = async (data) => {
      const URL = "http://127.0.0.1:8080/HRC20172W-back_end/Analytics";
      const res = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setAnalytics(res.data.data);
      }
    };
    if (!!Object.keys(analyticsParameters).length) {
      analyticsViewAPI(analyticsParameters);
      setAnalyticsViewDialogOpen(false);
      // setAnalyticsViewWindowOpen(true);
    }
  }, [analyticsParameters]);

  useEffect(() => {
    if (!!Object.keys(analytics).length) {
      setAnalyticsViewWindowOpen(true);
    }
  }, [analytics]);

  // for deleting row[s]
  useEffect(() => {
    const deleteInvoiceRecordsAPI = async (data) => {
      const URL = "http://127.0.0.1:8080/HRC20172W-back_end/Delete";

      const res = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsDeleting(false);
      setSelected([]);
      setRefreshKey((oldKey) => oldKey * -1);
    };
    if (isDeleting) {
      const data = {
        sl_nos: selected,
      };
      deleteInvoiceRecordsAPI(data);
    }
  }, [isDeleting, selected]);

  // for editing a row
  useEffect(() => {
    const editInvoiceRecordsAPI = async (data) => {
      const URL = "http://127.0.0.1:8080/HRC20172W-back_end/Edit";

      const res = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSelected([]);
      setRefreshKey((oldKey) => oldKey * -1);
    };
    if (!!Object.keys(editParams).length) {
      editInvoiceRecordsAPI(editParams);
    }
  }, [editParams]);

  // for adding a row
  useEffect(() => {
    const addInvoiceRecordAPI = async (data) => {
      const URL = "http://127.0.0.1:8080/HRC20172W-back_end/Add";
      const business_code = data["business_code"];
      const cust_number = data["cust_number"];
      delete data["business_code"];
      delete data["cust_number"];
      const business = {
        business_code: business_code,
      };
      const customer = {
        cust_number: cust_number,
      };

      const formatedData = { ...data, business, customer };
      try {
        formatedData["buisness_year"] = formatedData["buisness_year"].substr(
          0,
          4
        );
      } catch (error) {
        console.log("buisness_year not found");
      }
      const res = await axios.post(URL, formatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setRefreshKey((oldKey) => oldKey * -1);
    };
    if (!!Object.keys(addParams).length) {
      addInvoiceRecordAPI(addParams);
    }
  }, [addParams]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOnAdd = (data) => {
    setAddParams(data);
    setPage(0);
  };

  const handleOnEdit = (data) => {
    const editData = {
      sl_no: selected[0],
      ...data,
    };
    const oldRecord = records.filter(
      (record) => record["sl_no"] === editData.sl_no
    );
    let isDiff = -1;
    if (!!editData.cust_payment_terms.trim())
      isDiff =
        isDiff &&
        editData.cust_payment_terms.trim() !== oldRecord.cust_payment_terms;

    if (!!editData.invoice_currency.trim())
      isDiff =
        isDiff &&
        editData.invoice_currency.trim() !== oldRecord.invoice_currency;
    if (isDiff === -1) return;
    else if (isDiff) {
      setEditParams(editData);
      setPage(0);
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} sx={{ width: "100%" }}>
        <AdvanceSearch
          handleOnSearch={(data) => {
            setAdvanceSearchParams(data);
            setPage(0);
          }}
          open={isAdvanceSearchDialogOpen}
          handleClose={() => {
            setAdvanceSearchDialogOpen(false);
          }}
        />
        <AnalyticsDialog
          handleOnSubmitAnalyticsForm={(data) => setAnalyticsParameters(data)}
          open={isAnalyticsViewDialogOpen}
          handleClose={() => setAnalyticsViewDialogOpen(false)}
        />
        <AnalyticsViewWindow
          analytics={analytics}
          open={isAnalyticsViewWindowOpen}
          handleClose={() => setAnalyticsViewWindowOpen(false)}
        />
        <AddRow
          open={isAddDialogOpen}
          handleOnAdd={handleOnAdd}
          handleClose={() => setAddDialogOpen(false)}
        />
        <EditRow
          open={isEditDialogOpen}
          handleOnEdit={handleOnEdit}
          handleClose={() => setEditDialogOpen(false)}
        />
        <DeleteRow
          open={isDeleteDialogOpen}
          handleOnDelete={() => {
            setIsDeleting(true);
            setPage(0);
          }}
          handleClose={() => setDeleteDialogOpen(false)}
        />
        <EnhancedTableToolbar
          handleAdvanceSearchOpen={() => setAdvanceSearchDialogOpen(true)}
          handleAnalyticsViewOpen={() => setAnalyticsViewDialogOpen(true)}
          handleReload={() => {
            setAdvanceSearchParams({});
            setPage(0);
            setOrderBy("sl_no");
            setOrder("asc");
            setRefreshKey((oldKey) => oldKey * -1);
          }}
          rowsSelected={selected.length}
          onAddButtonClick={() => setAddDialogOpen(true)}
          onEditButtonClick={() => {
            setEditDialogOpen(true);
          }}
          onDeleteButtonClick={() => {
            setDeleteDialogOpen(true);
          }}
          handlePredictButtonClick={() => {
            selected.forEach((sl_no) => {
              const res = records.filter((record) => record.sl_no === sl_no);
              setSelected_record_list((oldlist) => [...oldlist, ...res]);
            });
            setIsPredicting(true);
          }}
          onCustomerIdSearch={(queryString) => {
            setSearchTextEntry(queryString);
            setPage(0);
          }}
          handleOnClearSearchBox={() => {
            setSearchTextEntry("");
            setPage(0);
          }}
        />
        <TableContainer>
          <Table
            sx={{
              tableLayout: "auto",
              minWidth: 750,
              backgroundColor: "primary.main",
              color: "text.main",
            }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={records.length}
            />
            <TableBody>
              {stableSort(records, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          sx={{
                            color: "outline.main",
                            "&.Mui-checked": {
                              color: "outline.main",
                            },
                          }}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                      >
                        {row.sl_no}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.business_code}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.cust_number}
                      </StyledTableCell>
                      <StyledTableCell
                        align={row.clear_date ? "right" : "center"}
                      >
                        {row.clear_date ? row.clear_date : "-"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.buisness_year}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.doc_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.posting_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.document_create_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.due_in_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.invoice_currency}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.document_type}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.posting_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.total_open_amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.baseline_create_date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.cust_payment_terms}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.invoice_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.aging_bucket}
                      </StyledTableCell>
                    </TableRow>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={17} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            backgroundColor: "secondary.main",
            color: "text.main",
          }}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
