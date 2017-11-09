import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Glyphicon } from "react-bootstrap";

// Table.
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import * as instanceSelectActions from "../actions/instanceSelectActions";

class InstanceSelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = {
      instances: [],
      filters: []
    };
    this.state = initialValues;

    this.onRowSelect = this.onRowSelect.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    const filters = this.props.filters;
    this.props.dispatch(
      instanceSelectActions.fetchInstances(
        "us-east-1",
        this.props.uniqueId,
        filters
      )
    );
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].instances.length !== 0) {
      newValue = this.props[this.props.uniqueId].instances[0].Instances[0]
        .InstanceId;
      this.props.updateParent(newValue);
    }
  }

  onRowSelect(row, isSelect, e) {
    this.props.dispatch(
      instanceSelectActions.selected(row.id, this.props.uniqueId)
    );
    this.props.updateParent(row.id);
  }

  handleOnChange(event) {
    instanceSelectActions.fetchInstances(
      this.props.region,
      this.props.uniqueId,
      this.props.filters
    );
  }

  render() {
    // Create table.
    let bootStrapTable = "No instances available.";
    let renderableInstances = [];

    if (this.props[this.props.uniqueId].instances.length !== 0) {
      renderableInstances = this.props[
        this.props.uniqueId
      ].instances.map(instance => {
        // Determined if deployed.
        let deployedState = "";
        if (
          this.props.deployed &&
          this.props.deployed.length !== 0 &&
          this.props.deployed[0].instanceId === instance.Instances[0].InstanceId
        ) {
          deployedState = "Deployed";
        }

        const mapped = {
          id: instance.Instances[0].InstanceId,
          name: findTag("Name", instance.Instances[0]),
          version: findTag("Version", instance.Instances[0]),
          state: instance.Instances[0].State.Name,
          deployed: deployedState
        };

        return mapped;
      });

      // Notify the parent of the default.
      this.props.updateParent(renderableInstances[0].id);

      const selectRowProp = {
        mode: "radio",
        clickToSelect: true,
        onSelect: this.onRowSelect,
        selected: [renderableInstances[0].id]
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

function findTag(tagName, instance) {
  let result = [];
  if (instance.Tags) {
    result = instance.Tags.filter(tag => {
      if (tag.Key === tagName) {
        return tag.Value;
      }
      return "";
    });
  }

  return result.length === 0 ? "" : result[0].Value;
}

const mapStateToProps = (state, ownProps) => {
  let newProps = {
    deployed: state.bluegreen.deployed
  };

  newProps[ownProps.uniqueId] = state.instanceSelect[ownProps.uniqueId];

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
