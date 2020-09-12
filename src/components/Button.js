import React from 'react';
import './Button.css';

const style = {/* 
    background : 'transparent',
    border : '1px solid #171212',
    padding: '5px',
    cursor: 'pointer' */
}

const Button = ({ type, disabled, className, children }) => {

    return (
    <button type={type} disabled={disabled} className={ className } style={style}>{ children }</button>
    )
}

export default Button;