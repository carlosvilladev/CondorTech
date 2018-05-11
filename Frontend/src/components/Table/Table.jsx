import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TablePagination,
  TableBody,
  TableCell,
  TableSortLabel,
  Select,
  FormControl,
  MenuItem,
  Input,
  InputLabel,
  TextField,
  Button
} from "material-ui";

import PropTypes from "prop-types";

import tableStyle from "assets/jss/material-dashboard-react/tableStyle";
import axios from 'axios'
import moment from 'moment';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rowCount, className } = this.props;
    const columns = [
      { id: "cd_cebroker_state", numeric: false, disablePadding: false, label: "State Code" },
      { id: "pro_cde", numeric: true, disablePadding: true, label: "Pro Code" },
      { id: "prof", numeric: false, disablePadding: false, label: "Profession" },
      { id: "lid", numeric: false, disablePadding: false, label: "License ID" },
      { id: "ced", numeric: false, disablePadding: false, label: "Cycle End Date" },
      { id: "cs", numeric: false, disablePadding: false, label: "Compliance Status" },
      { id: "cid", numeric: false, disablePadding: false, label: "Client ID" },
      { id: "sld", numeric: false, disablePadding: false, label: "Start Log Date" },
      { id: "eld", numeric: false, disablePadding: false, label: "End Log Date" },
      { id: "env", numeric: false, disablePadding: false, label: "Environment" },
      { id: "mach", numeric: false, disablePadding: false, label: "Machine" }
    ]

    return (
      <TableHead className={className}>
        <TableRow>
          {
            columns.map(column => {
              return (
                <TableCell
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
                >

                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              );
            }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  className: PropTypes.string
};

class CustomTable extends React.Component {
  constructor(props) {
    super(props)
    // this.state = this.props;
    const defaultDate = "2017-02-02"
    this.state = {
      startDate: moment(defaultDate).utc().format('MM/DD/YYYY'),
      endDate: moment(defaultDate).utc().format('MM/DD/YYYY'),
      defaultDate
    }
  }

  getLogs = (startDate, endDate, status = 'FL') => {
    return axios.get(`https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=${startDate}&enddate=${endDate}&state=${status}`, {
      responseType: 'json'
    })
  }

  sort = (property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const tableData =
      order === 'desc'
        ? this.state.tableData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.tableData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ tableData, order, orderBy });
  }

  componentWillMount() {
    this.setState({
      rowsPerPage: 20,
      page: 0,
      order: 'asc',
      orderBy: 'sld',
      stateCode: 'FL'
    })
  }

  componentDidMount() {
    const { startDate, endDate } = this.state;
    this.getLogs(startDate, endDate).then((response) => {
      const tableData = response.data.map(item => {
        return item
      })
      this.setState({ ...this.state, tableData });
    })
  }

  handleChange = event => {
    const sc = event.target.value
    const { startDate, endDate } = this.state;

    this.setState({ ...this.state, stateCode: sc });
    this.getLogs(startDate, endDate, sc).then((response) => {
      const tableData = response.data.map(item => {
        return item
      })

      this.setState({ ...this.state, tableData });
    })
  };

  handleRequestSort = (event, property) => {
    this.sort(property)
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleStartDateChange = (event) => {
    const startDate = moment(event.target.value).utc().format('MM/DD/YYYY');
    this.setState({
      ...this.state,
      startDate
    })
  }

  handleEndDateChange = (event) => {
    const endDate = moment(event.target.value).utc().format('MM/DD/YYYY');
    this.setState({
      ...this.state,
      endDate
    })
  }

  handleOnClickFilter = () => {
    const { startDate, endDate, sc } = this.state;
    this.setState({ ...this.state, tableData: [] });
    this.getLogs(startDate, endDate, sc).then((response) => {
      const tableData = response.data.map(item => {
        return item
      })

      this.setState({ ...this.state, tableData });
    })
  }

  render() {
    const { classes, tableHead, tableHeaderColor } = this.props
    const { data, order, orderBy, rowsPerPage, page, tableData, defaultDate } = this.state

    return (
      <div>
        <div className={classes.container}>
          <FormControl>
            <InputLabel htmlFor="select-multiple">SC</InputLabel>
            <Select
              value={this.state.stateCode}
              onChange={this.handleChange}
              input={<Input id="select-multiple" />}
            >
              {
                ['FL', 'OH', 'GA', 'LA'].map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              id="date"
              label={"From"}
              type="date"
              defaultValue={defaultDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleStartDateChange}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="date"
              label={"To"}
              type="date"
              defaultValue={defaultDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleEndDateChange}
            />
          </FormControl>
          <Button variant="raised" size="small" color="primary" className={classes.button} onClick={this.handleOnClickFilter}>
            Filter
            </Button>
        </div>
        <div className={classes.tableResponsive}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={tableData ? tableData.length : 0}
              className={classes[tableHeaderColor + "TableHeader"]}
            />
            <TableBody>
              {
                tableData && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell className={classes.tableCell}>
                        {prop.cd_cebroker_state}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.pro_cde}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.cd_profession || "N/A"}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.id_license}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(prop.dt_end).utc().format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.ds_compl_status_returned}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.id_client_nbr}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(prop.dt_Start_Log).utc().format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(prop.dt_end_log).utc().format('MM/DD/YYYY')}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.cd_environment}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {prop.cd_machine}
                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={tableData ? tableData.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  order: 'asc',
  orderBy: 'sld',
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  page: 0,
  rowsPerPage: 20,
  stateCode: 'FL'
};

export default withStyles(tableStyle)(CustomTable);
