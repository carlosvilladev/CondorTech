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
} from "material-ui";

import PropTypes from "prop-types";

import tableStyle from "assets/jss/material-dashboard-react/tableStyle";
import axios from 'axios'

const getLogs  = (date, status='FL') => {
  return axios.get(`https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?startdate=${date}&enddate=${date}&state=${status}`, {
      responseType: 'json'
  })
}

const initialState = {
  logData: []
};

const columns = [
  {id : "cd_cebroker_state", numeric: false, disablePadding : false, label: "State Code"}, 
  {id : "pro_cde", numeric: true, disablePadding : true, label:"Pro Code"}, 
  {id: "prof", numeric: false, disablePadding : false, label:"Profession"}, 
  {id: "lid", numeric: false, disablePadding : false, label:"License ID"}, 
  {id: "ced", numeric: false, disablePadding : false, label:"Cycle End Date"}, 
  {id: "cs", numeric: false, disablePadding : false, label:"Compliance Status"}, 
  {id:"cid", numeric: false, disablePadding : false, label:"Client ID"}, 
  {id: "sld", numeric: false, disablePadding : false, label:"Start Log Date"}, 
  {id: "eld", numeric: false, disablePadding : false, label:"End Log Date"}, 
  {id: "env", numeric: false, disablePadding : false, label:"Environment"}, 
  {id: "mach", numeric: false, disablePadding : false, label:"Machine"}
]
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy,  rowCount, className } = this.props;

    return (
      <TableHead className={className}>
        <TableRow>
          {columns.map(column => {
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
  className : PropTypes.string
};
const names = [
      'FL',
      'OH',
      'GA',
      'LA'
    ];
    
class CustomTable extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props
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

  componentWillMount(){
    this.setState({
      rowsPerPage : 20,
      page : 0,
      order: 'asc',
      orderBy: 'sld',
      stateCode : 'FL'
    })

  }

  componentDidMount () {
    const date = new Date()
    const day =  date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const date_s = `${month}/${day}/${year}`
    
    getLogs("02/02/2017")
    .then((response)=>{
      console.log(response.data)
      const tableData = response.data.map((val,i)=>{
        return val
      })
      
      this.setState({
        tableData
      });
    })
  }

  handleChange = event => {
    const sc = event.target.value
    this.setState({ stateCode: sc });
    getLogs("02/02/2017", sc)
    .then((response)=>{
      console.log(response.data)
      const data = response.data.map((val,i)=>{
        return val
      })
      
      this.setState({
        tableData : data
      });
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

  render(){
    const { classes, tableHead, tableHeaderColor } = this.props
    const {data, order, orderBy, rowsPerPage, page, tableData} = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.tableData.length - page * rowsPerPage);

    return (
      <div className={classes.tableResponsive}>
        <FormControl>
          <InputLabel htmlFor="select-multiple">SC</InputLabel>
          <Select
            value={this.state.stateCode}
            onChange={this.handleChange}
            input={<Input id="select-multiple" />}
          >{names.map(name => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <Table className={classes.table}>
          <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.tableData.length}
              className={classes[tableHeaderColor + "TableHeader"]}
            />
          {/* {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null} */}
          <TableBody>
            {this.state.tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prop, key) => {
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
                        {prop.dt_end}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.ds_compl_status_returned}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.id_client_nbr}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.dt_Start_Log}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.dt_end_log}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.cd_environment}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                        {prop.cd_machine}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tableData.length}
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
  page : 0,
  rowsPerPage : 20,
  stateCode : 'FL'
};

export default withStyles(tableStyle)(CustomTable);
