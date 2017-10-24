import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";
import RegionsSelect from "./RegionsSelect";
import AMISelect from "./AMISelect";
import * as amiSelectActions from "../actions/amiSelectActions";
import * as messageBoxActions from "../actions/messageBoxActions";
import * as waitFor from "../containers/waitFor";

class CopyImageComponentPresentation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      destName: '',
      destRegion: 'us-east-1',
      srcRegion: 'us-east-1',
      srcAMI: '',
      destDescription: ''
    };

    this.handleSrcRegion = this.handleSrcRegion.bind(this);
    this.handleSrcAMI = this.handleSrcAMI.bind(this);
    this.handleChildUpdatedAMI = this.handleChildUpdatedAMI.bind(this);
    this.handleDestName = this.handleDestName.bind(this);
    this.handleDestRegion = this.handleDestRegion.bind(this);
    this.handleDestDescription = this.handleDestDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDestName(event) {
    this.setState({ destName: event.target.value });
  }

  handleDestRegion(event) {
    this.setState({ destRegion: event.target.value });
  }

  handleSrcRegion(event) {
    const filters = this.amiFilters();
    this.props.dispatch(amiSelectActions.fetchAMIs(
      event.target.value,
      'copyImage_srcRegion',
      filters)); 
    this.setState({ srcRegion: event.target.value });
  }

  handleSrcAMI(event) {
    this.setState({ srcAMI: event.target.value });
  }

  handleChildUpdatedAMI(amiId) {
    this.setState({ srcAMI: amiId });
  }

  handleDestDescription(event) {
    this.setState({ destDescription: event.target.value });
  }
  
  async handleSubmit(event) {
    this.props.dispatch(
      messageBoxActions.message("Copying image "
        + this.state.srcAMI + " to region "
        + this.state.destRegion + ".")
    );

    let copyResults = await invokeApig({
      path: "/copy-image-regions",
      method: "POST",
      headers: {},
      queryParams: {},
      body: {
        destName: this.state.destName,
        destRegion: this.state.destRegion,
        srcRegion: this.state.srcRegion,
        srcAMI: this.state.srcAMI,
        destDescription: this.state.destDescription
    }});

    const data = copyResults;
    const newImageId = data.ImageId;

    this.props.dispatch(
      messageBoxActions.message("Copied image has AMI id of "
        + newImageId + " in region "
        + this.state.destRegion + ". Waiting for copy to complete."
      ));

    const waitForImageResult =
      await waitFor.waitForImageAvailable(newImageId, this.state.destRegion);

    let resultMessage = "";
    (waitForImageResult.status === "false")
      ? resultMessage = "WARNING: Image " + newImageId + " failed to become available."
      : resultMessage = "Image " + newImageId + " is now in state "
      + waitForImageResult.status + ".";

    this
      .props
      .dispatch(messageBoxActions.message(resultMessage));

    event.preventDefault();
  }

  amiFilters() {
    return [
        {
          Name: "state",
          Values: [ "available" ],
        }
      ];
  }

  shouldComponentUpdate(nextProps) {
    // This only works without real logic because text boxes are not controlled.
    return false;
  }

  render() {
    return (
    <span>
      <form onSubmit={ this.handleSubmit }>

    <Grid>
      <Row>
        <Col xs={12} md={2}>
          Source Region
        </Col>
        <Col xs={12} md={10}>
          <RegionsSelect onSelectHandler={ this.handleSrcRegion } />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={2}>
          Source AMI
        </Col>
        <Col xs={12} md={10}>
          <AMISelect
            onSelectHandler={ this.handleSrcAMI } 
            updateParent={ this.handleChildUpdatedAMI }
            filters={ this.amiFilters() }
            uniqueId="copyImage_srcRegion" /> 
        </Col>
      </Row> 

      <Row>
        <Col xs={12} md={2}>
          Destination Region
        </Col>
        <Col xs={12} md={10}>
          <RegionsSelect onSelectHandler={ this.handleDestRegion } />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={2}>
          Destination Name
        </Col>
        <Col xs={12} md={10}>
          <input type="text"
            onChange={ this.handleDestName } />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={2}>
          Destination Description
        </Col>
        <Col xs={12} md={10}>
          <input type="text" 
            onChange={ this.handleDestDescription } />
        </Col> 
      </Row>

      <Row>
        <Col xs={12} md={12}>
          <Button onClick={ this.handleSubmit }>Copy</Button>
        </Col>
      </Row>

    </Grid>

        </form>
    </span>
    )
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps = (state, ownProps) => {
  const newProps = {};
  return newProps;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  }
}

const CopyImageComponent = connect(mapStateToProps,mapDispatchToProps)(CopyImageComponentPresentation);
export default CopyImageComponent;