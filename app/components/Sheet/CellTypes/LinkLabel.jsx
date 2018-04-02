import React from 'react';
import {Label} from 'react-bootstrap';

const LinkLabel = ({data}) => {
  const style = {
    fontSize: '20px',
    display: 'inline-block',
    clear: 'both',
  };

  return (
    <div style={style}>
      <Label bsStyle="info">{data} </Label>
    </div>
  );
};

export default LinkLabel;
