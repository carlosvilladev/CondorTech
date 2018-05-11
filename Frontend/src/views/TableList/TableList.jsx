import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "components";
import axios from 'axios'


class TableList extends React.Component{
  state = {
    data: []
  };

  
  render(){
    if (!this.state.data){
      return (<div>Loading...</div>)
    }
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Simple Table"
            cardSubtitle="Here is a subtitle for this table"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["State Code", "Pro Code", "Profession", "License ID", "Cycle End Date", "Compliance Status", "Client ID", "Start Log Date", "End Log Date", "Environment", "Machine"]}
                tableData={this.state.data}
              />
            }
          />
        </ItemGrid>
      </Grid>
    );
  }
}

export default TableList;
