import React, { Component } from "react";

// Table.
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Row, Col, Button, Glyphicon } from "react-bootstrap";
import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import Select from "react-select";
import { connect } from "react-redux";
import * as amiSelectActions from "../actions/amiSelectActions";

class AMISelectPresentation extends Component {
  constructor(props) {
    super(props);

    let initialValues = {};
    initialValues[props.uniqueId] = [];

    const propsAMIKey = props.uniqueId + "_currentAMI";
    initialValues[propsAMIKey] = "";

    this.state = initialValues;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.onAMISelect = this.onAMISelect.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      amiSelectActions.fetchAMIs(
        "us-east-1",
        this.props.uniqueId,
        this.props.filters
      )
    );
  }

  componentDidUpdate() {
    // Handle redux state changes needing propagation upstream.
    let newValue = "";
    if (this.props[this.props.uniqueId].length !== 0) {
      newValue = this.props[this.props.uniqueId][0].ImageId;
    }
  }

  handleOnChange(event) {
    this.props.dispatch(
      amiSelectActions.fetchAMIs(
        event.target.value,
        this.props.uniqueId,
        this.filters
      )
    );
  }

  onAMISelect(event) {
    this.props.dispatch(
      amiSelectActions.setAMI(event.target.value, this.props.uniqueId)
    );
  }

  onRowSelect(row, isSelect, e) {
    this.props.dispatch(amiSelectActions.setAMI(row.id, this.props.uniqueId));
  }

  render() {
    // Create table.
    let bootStrapTable = "No AMIs available.";
    let renderableInstances = [];

    const amiItems = this.props[this.props.uniqueId];
    let amiTable = "No AMIs available.";
    let renderableAMIs = [];

    if (amiItems.length !== 0) {
      renderableAMIs = this.props[this.props.uniqueId].map(ami => {
        const name = ami.Name;

        let version = findTag("Version", ami);
        if (version.length !== 0 && version !== "") {
          version = version[0].Value;
        } else {
          version = "";
        }

        const mapped = {
          id: ami.ImageId,
          name: name,
          version: version
        };

        return mapped;
      });

      const selectRowProp = {
        mode: "radio",
        clickToSelect: true,
        onSelect: this.onRowSelect
      };

      amiTable = (
        <span>
          <Row>
            <Col xs={11} md={11} />
            <Col xs={1} md={1}>
              <Button onClick={this.handleOnChange} pullRight="true">
                <Glyphicon glyph="refresh" />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <BootstrapTable
                data={renderableAMIs}
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
              </BootstrapTable>
            </Col>
          </Row>
        </span>
      );
    }

    return <span>{amiTable}</span>;
  }
}

function findTag(tagName, image) {
  let result = [{ Key: tagName, Value: "" }];
  if (image.Tags) {
    result = image.Tags.filter(tag => {
      if (tag.Key === tagName) {
        return tag.Value;
      }
    });
    return result;
  }
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  newProps[ownProps.uniqueId] = state.amiSelect[ownProps.uniqueId];
  newProps[ownProps.uniqueId + "_currentAMI"] = "";
  return newProps;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const AMISelect = connect(mapStateToProps, mapDispatchToProps)(
  AMISelectPresentation
);
export default AMISelect;
