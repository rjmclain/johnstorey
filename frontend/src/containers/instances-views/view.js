import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import InstanceSelect from "../../components/InstanceSelect";

export default ({ handleInstanceId, setInstanceId, namespace, filters }) => {
  return (
    <div>
      <Row className="instance">
        <Col xs={12} md={12}>
          <InstanceSelect
            onSelectHandler={handleInstanceId}
            updateParent={setInstanceId}
            namespace={namespace}
            filters={filters}
            region="us-east-1"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={9} md={9} />
        <Col xs={3} md={3}>
          <Button onClick={handleInstanceId} className="deploy-button">
            Deploy Now
          </Button>
        </Col>
        <Col xs={2} md={2} />
      </Row>
    </div>
  );
};
