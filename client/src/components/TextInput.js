import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
const TextInput = props => {
  const capitalize = text => text.substring(0, 1).toUpperCase() + text.substring(1);

  return (
  <FormGroup>
    <Label for={props.name}>{props.label || capitalize(props.name)}</Label>
    <Input type={props.type || "text"} name={props.name} id={props.name} placeholder={props.placeholder || capitalize(props.name)} />
  </FormGroup>
  );
}

export default TextInput;
