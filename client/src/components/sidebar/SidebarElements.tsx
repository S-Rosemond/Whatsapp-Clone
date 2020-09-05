import React, { Fragment } from 'react';
import { Nav } from 'react-bootstrap';

interface SEProps {
  array: string[];
}

export default function (props: SEProps) {
  const { array } = props;

  const returnElement = array.map((el, idx) => (
    <Nav.Item key={idx}>
      <Nav.Link eventKey={el}>{el}</Nav.Link>
    </Nav.Item>
  ));

  return <Fragment>{returnElement}</Fragment>;
}
