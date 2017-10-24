import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionModal from './questionModal';
import {
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

class StartInstancePresentation extends Component {
  constructor(props) {
    super(props);

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onPositiveResponse = this.onPositiveResponse.bind(this);
    this.onNegativeResponse = this.onNegativeResponse.bind(this);

    this.state = {
      showWarning: false,
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

  render() {
    let modal = null;
    if (this.state.showWarning === true) {
      modal = <QuestionModal
          header="Ask"
          body="When you ask a silly question, do you get a silly answer?"
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
          <input type="text" />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          AMI
         </Col>
         <Col xs={12} md={6}>
          <input type="text" />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Name
        </Col>
         <Col xs={12} md={6}>
          <input type="text" />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Description
        </Col>
         <Col xs={12} md={6}>
          <input type="text" />
        </Col>
       </Row>

       <Row className="show-grid">
         <Col xs={12} md={4} mdPush={2}>
          Version Tag
        </Col>
         <Col xs={12} md={6}>
          <input type="text" />
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