import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  Timer,
  Warning,
  ArrowUpward,
  Update,
  AccessTime,
  Accessibility
} from "@material-ui/icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/dashboardStyle";

class Dashboard extends React.Component {
  state = {
    value: 0,
    total_average_time : 0,
    data_requests_by_day : [],
    byMachines : {},
    byComplianceStatus : {}
  };

  getTotalRequests = (cb) => {
    const num = localStorage.getItem('total_requests')
    const sum_times = localStorage.getItem('sum_times')
    cb(num, sum_times)
    console.log(`Numero de Requests: ${num}, Suma de Tiempos: ${sum_times}`)
  }

  getRequestByDay = (cb) => {
    const d = new Date()
    const weekday = new Array(7);
    weekday[0] =  "S";
    weekday[1] = "M";
    weekday[2] = "T";
    weekday[3] = "W";
    weekday[4] = "T";
    weekday[5] = "F";
    weekday[6] = "S";
    
    const requestsByDays = weekday.map((m)=>{
      return parseInt(localStorage.getItem(m)) || 0
    })
    console.log(requestsByDays)
    cb(requestsByDays)
  }

  getRequestByMachines = () => {
    const byMachines = JSON.parse(localStorage.getItem("byMachines"))
    const labels = Object.keys(byMachines)
    const values = Object.values(byMachines)
    this.setState({byMachines : {labels : labels, series : [values]}})
    console.log(labels, values)
  }

  getRequestByComplianceStatus = () => {
    const byComplianceStatus = JSON.parse(localStorage.getItem("byComplianceStatus"))
    const labels = Object.keys(byComplianceStatus)
    const values = Object.values(byComplianceStatus)
    this.setState({byComplianceStatus  : {labels : labels, series : [values]}})

  }

  componentWillMount = () => {
    this.getTotalRequests((num, sum_times)=>{this.setState({total_average_time : Math.round((sum_times/num) || 0)})})    
    this.getRequestByDay((requestsByDays) => {this.setState({data_requests_by_day : requestsByDays})})
    this.getRequestByMachines()
    this.getRequestByComplianceStatus()
  }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Timer}
              iconColor="orange"
              title="Total Average Response Time"
              description={this.state.total_average_time}
              small="ms"
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels : ["M", "T", "W", "T", "F", "S", "S"],
                    series: [[this.state.data_requests_by_day[1],
                    this.state.data_requests_by_day[2], 
                    this.state.data_requests_by_day[3], 
                    this.state.data_requests_by_day[4], 
                    this.state.data_requests_by_day[5],
                    this.state.data_requests_by_day[6],
                    this.state.data_requests_by_day[0]]]
                  }}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Average Response Time per Day"
              text=""
              statIcon={AccessTime}
              statText="..."
            />
          </ItemGrid>
        </Grid>
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <ChartCard
                chart={
                  <ChartistGraph
                    className="ct-chart"
                    data={this.state.byMachines}
                    type="Bar"
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                  />
                }
                chartColor="orange"
                title="Total Requests per Machine"
                text=""
                statIcon={AccessTime}
                statText="..."
              />
            </ItemGrid>
        </Grid>
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <ChartCard
                chart={
                  <ChartistGraph
                    className="ct-chart"
                    data={this.state.byComplianceStatus}
                    type="Bar"
                    options={emailsSubscriptionChart.options}
                    responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                    listener={emailsSubscriptionChart.animation}
                  />
                }
                chartColor="red"
                title="Total Requests per Machine"
                text=""
                statIcon={AccessTime}
                statText="..."
              />
            </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
