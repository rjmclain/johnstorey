import React, { Component } from "react";
import { connect } from "react-redux";

// Table.
import { BottstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import * as instanceSelectActions from "../actions/instanceSelectActions";

class InstanceSelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = {
      instances: [],
      filters: [],
    };
    this.state = initialValues;
  }

  componentDidMount() {
    const filters = this.props.filters;
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        this.props.uniqueId,
        filters));
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].instances.length !== 0) {
      newValue = this.props[this.props.uniqueId].instances[0].Instances[0].InstanceId;
    this.props.updateParent(newValue);
    }
  }

  render() {
    let ReactBsTable = require('react-bootstrap-table');
    let BootstrapTable = ReactBsTable.BootstrapTable;
    let TableHeaderColumn = ReactBsTable.TableHeaderColumn;

    // Create table.
    let bootStrapTable = 'No instances available.';
    let renderableInstances = [];
    if (this.props[this.props.uniqueId].instances.length !== 0) {
      renderableInstances = this.props[this.props.uniqueId].instances.map(
        (instance) => {
          console.log('instance', instance);
          const mapped = {
            id: instance.Instances[0].InstanceId,
            name: findTag('Name', instance.Instances[0]),
            version: findTag('Version', instance.Instances[0]), 
            state: instance.Instances[0].State.Name,
          };
          return mapped;
      });
          console.log('renderableInstances', renderableInstances);

        const selectRowProp = { mode: 'radio' };
        bootStrapTable = (
            <BootstrapTable data={renderableInstances} selectRow={ selectRowProp } triped hover>
              <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
              <TableHeaderColumn dataField='version'>Version</TableHeaderColumn>
              <TableHeaderColumn dataField='state'>State</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    return (
        <span>
          { bootStrapTable }
        </span>
    );
  }
}

function findTag(tagName, instance) {
  let result = [];
  if (instance.Tags) {
    result = instance.Tags.filter( (tag) => {
      if (tag.Key === tagName) {
        return tag.Value 
      }
    });

    console.log('result 1', result);
  }

  return (result.length == 0) ? '' : result[0].Value;
}

const mapStateToProps = (state, ownProps) => {
  let newProps = {} ;
  newProps[ownProps.uniqueId] = state.instanceSelect[ownProps.uniqueId];
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const InstanceSelect = connect(mapStateToProps,mapDispatchToProps)(InstanceSelectPresentation);
export default InstanceSelect;