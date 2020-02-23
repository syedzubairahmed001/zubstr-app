import React from 'react';
import { styled } from '@material-ui/core';
import { Button } from "@material-ui/core";

const cutomBtn = styled(Button)({
    background: '#0083FF',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #0083FF',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });
const btn = props => (
    <cutomBtn {...props} >
        {props.children}
    </cutomBtn>
);

export default btn;