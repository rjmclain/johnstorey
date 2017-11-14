import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Glyphicon } from "react-bootstrap";

// Table.
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import * as awsHelpers from "../libs/awsHelpers";
import * as instanceSelectActions from "../actions/instanceSelectActions";

class InstanceSelectPresentation extends Component {
  constructor(props) {
    super(props);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    /*
    let newValue = "";
    if (this.props[this.props.namespace].instances.length !== 0) {
      newValue = this.props[this.props.namespace].instances[0].Instances[0]
        .InstanceId;

      console.log("InstanceSelect componentDidUpdate newValue", newValue);

      this.props.dispatch(
        instanceSelectActions.selected(newValue, this.props.namespace)
      );
    }
    */
  }

  onRowSelect(row, isSelect, e) {
    this.props.dispatch(
      instanceSelectActions.selected(row.id, this.props.namespace)
    );
  }

  handleOnChange(event) {
    instanceSelectActions.fetchInstances(
      this.props.region,
      this.props.namespace,
      this.props.filters
    );
  }

  render() {
    // Create table.
    let bootStrapTable = "No instances available.";
    let renderableInstances = [];

    if (this.props.instances.length !== 0) {
      renderableInstances = this.props[
        this.props.namespace
      ].instances.map(instance => {
        // Determined if deployed.
        let deployedState = "";
        if (this.props.isDeployed === instance.Instances[0].InstanceId) {
          deployedState = "Deployed";
        }

        const mapped = {
          id: instance.Instances[0].InstanceId,
          name: awsHelpers.findTag("Name", instance.Instances[0].Tags),
          version: awsHelpers.findTag("Version", instance.Instances[0].Tags),
          state: instance.Instances[0].State.Name,
          deployed: deployedState
        };

        return mapped;
      });

      /*
      console.log('InstanceSelect render rederableInstances[0].id',
        renderableInstances[])
      this.props.dispatch(
        instanceSelectActions.selected(
          renderableInstances[0].id,
          this.props.namespace
        )
      );
      */
      const selectRowProp = {
        mode: "radio",
        clickToSelect: true,
        onSelect: this.onRowSelect
      };

      bootStrapTable = (
        <span>
          <Row>
            <Col xs={11} md={11} />
            <Col xs={1} md={1}>
              <Button onClick={this.handleOnChange}>
                <Glyphicon glyph="refresh" />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <BootstrapTable
                data={renderableInstances}
                selectRow={selectRowProp}
                striped
                hover
              >
                <TableHeaderColumn isKey dataField="id">
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                <TableHeaderColumn dataField="version">
                  Version
                </TableHeaderColumn>
                <TableHeaderColumn dataField="deployed">
                  Deployed
                </TableHeaderColumn>
              </BootstrapTable>
            </Col>
          </Row>
        </span>
      );
    }

    return <span>{bootStrapTable}</span>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let newProps = {
    instances: state.instanceSelect[ownProps.namespace].instances,
    isDeployed: state.instanceSelect[ownProps.namespace].isDeployed
  };

  newProps[ownProps.namespace] = state.instanceSelect[ownProps.namespace];

  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const InstanceSelect = connect(mapStateToProps, mapDispatchToProps)(
  InstanceSelectPresentation
);
export default InstanceSelect;
