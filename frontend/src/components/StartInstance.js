import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid, 
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import * as messageBoxActions from '../actions/messageBoxActions';
import * as amiSelectActions from '../actions/amiSelectActions';
import QuestionModal from './QuestionModal';
import RegionsSelect from './RegionsSelect';
import AMISelect from './AMISelect';

class StartInstancePresentation extends Component {
  constructor(props) {
    super(props);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onPositiveResponse = this.onPositiveResponse.bind(this);
    this.onNegativeResponse = this.onNegativeResponse.bind(this);
    this.handleRegionUpdate = this.handleRegionUpdate.bind(this);
    this.handleAMI = this.handleAMI.bind(this);
    this.handleChildUpdateAMI = this.handleChildUpdateAMI(this);
    this.amiFilters = this.amiFilters.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleVersion = this.handleVersion.bind(this);

    this.state = {
      showWarning: false,
      region: 'us-east-1',
      amiId: '',
      name: '',
      description: '',
      version: '',
    };
  }

  onHandleSubmit(e) {
    this.setState({showWarning: true});
  }

  onPositiveResponse(e) {
    this.setState({showWarning: false});
  }

  onNegativeResponse(e) {
    this.setState({showWarning: false});
  }

    handleRegionUpdate(event) {
      this
        .props
        .dispatch(messageBoxActions.message('Fetching instances'));

      this
        .props
        .dispatch(
          amiSelectActions.fetchAMIs(
            this.state.region,
            'startinstance_amis',
            this.amiFilters()
          )
        );

      this.setState({ region: event.target.value });
    }

    handleAMI(event)  {
      this.setState({ amiId: event.target.value });
    }

    handleChildUpdateAMI(amiId) {
      this.setState({ amiId: amiId });
    } 
    amiFilters() {
      return [
        {
          Name: "state",
          Values: [ "available" ],
        }
      ];
    }

  handleName(event){
    this.setState({ name: event.target.value });
  }

  handleDescription(event){
    this.setState({ description: event.target.value });
  }
 
  handleVersion(event){
    this.setState({ version: event.target.value });
  }
  render() {
    let modal = null;
    if (this.state.showWarning === true) {
      modal = <QuestionModal
          header="Warning"
          body="Do you really want to start an instance on AWS?"
          positive="Yes"
          onPositiveResponse={ this.onPositiveResponse }
          negative="No"
          onNegativeResponse={ this.onNegativeResponse }
        />
    }
    return (
     <span>
     { modal }
     <Grid>
       <Row className="show-grid">
         <Col xs={12} md={12}>
          <h2>Create Image from Instance</h2>
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Region
         </Col>
         <Col xs={12} md={6}>
          <RegionsSelect
            onSelectHandler={ this.handleRegionUpdate }
          />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          AMI
         </Col>
         <Col xs={12} md={6}>
          <AMISelect
            onSelectHandler={ this.handleAMI }
            updateParent={ this.handleChildUpdateAMI }
            filters={ this.amiFilters() }
            uniqueId="startInstance_amis"
          />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Name
        </Col>
         <Col xs={12} md={6}>
          <input type="text" onChange={ this.handleName }/>
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Description
        </Col>
         <Col xs={12} md={6}>
          <input type="text" onChange={ this.handleDescription } />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Version Tag
        </Col>
         <Col xs={12} md={6}>
          <input type="text" onChange={ this.handleVersion } />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={0} md={4} mdPush={2}>
         </Col>
         <Col xs={12} md={4} mdPush={2}>
          <Button onClick={ (e) => this.onHandleSubmit(e) }>
            Create
          </Button>
         </Col>
       </Row>

     </Grid>
     </span>
    );
  }
}

// mapStateToProps() {
//   return {};
// }

// mapDispatchToState() {
//   return {
//     dispatch: dispatch,
//   };
// }

const StartInstance = connect()(StartInstancePresentation);
export default StartInstance;