function getFormattedDate(date) {
  let d = new Date(date);
  if (!date) return date;
  let year = `${d.getFullYear()}`;
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const filterData = (records) =>
  records.map((record) => {
    return {
      sl_no: record.sl_no,
      business_code: record.business.business_code,
      cust_number: record.customer.cust_number,
      name_customer: record.customer.name_customer,
      clear_date: getFormattedDate(record.clear_date),
      buisness_year: getFormattedDate(`${record.buisness_year}`),
      doc_id: record.doc_id,
      posting_date: getFormattedDate(record.posting_date),
      document_create_date: getFormattedDate(record.document_create_date),
      due_in_date: getFormattedDate(record.due_in_date),
      invoice_currency: record.invoice_currency,
      document_type: record.document_type,
      posting_id: record.posting_id,
      total_open_amount: record.total_open_amount,
      baseline_create_date: getFormattedDate(record.baseline_create_date),
      cust_payment_terms: record.cust_payment_terms,
      invoice_id: record.invoice_id,
      aging_bucket: "N/A",
    };
  });

const convertArrayToObject = (array, key, defaultValue) => {
  const value = defaultValue ?? getFormattedDate();
  const initialValue = {};
  return array.reduce((obj, item) => {
    const fieldName = item[key];
    const initialFieldValue = fieldName.includes("date")
      ? value
      : fieldName.includes("year")
      ? value
      : "";
    return {
      ...obj,
      [item[key]]: initialFieldValue,
    };
  }, initialValue);
};

export {
  getFormattedDate,
  convertArrayToObject,
  descendingComparator,
  getComparator,
  stableSort,
  filterData,
};
