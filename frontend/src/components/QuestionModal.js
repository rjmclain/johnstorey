import React, { Component } from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import * as messageBoxActions from '../actions/messageBoxActions';

class QuestionModalPresentation extends Component {
  constructor(props) {
    super(props);

    console.log('props', props);

    this.onHandlePositive = this.onHandlePositive.bind(this);
    this.onHandleNegative = this.onHandleNegative.bind(this);
  }

  onHandlePositive(e) {
    alert("Positive response");
  }

  onHandleNegative(e) {
    alert("Negative response");
  }

  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            { this.props.header }
          </Modal.Header>

          <Modal.Body>
            { this.props.body }
          </Modal.Body>

          <Modal.Footer>
            <Button
             onClick={ (e) => this.props.onNegativeResponse(e) }>{ this.props.negative }</Button>
            <Button
              onClick={ (e) => this.props.onPositiveResponse(e) }>{ this.props.positive }</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
  
}

// mapStateToProps() {
// }

// mapDispatchToState() {
//   return {
//     dispatch: dispatch,
//     onSubmit: () => onSubmitHandler(e) { alert('submit called'); },
//   };
  
// }

// const CreateImage = connect()(CreateImagePresentation);
// export default CreateImage;
export default QuestionModalPresentation;