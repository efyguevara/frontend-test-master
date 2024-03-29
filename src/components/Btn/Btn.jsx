import React from 'react';
import './index.css';
import { Button } from 'react-bootstrap';

const Btn = (props) => {
    const { title, align, theme, size, onClick, disabledButton, colorText } = props;

    return (
        <Button disabled={disabledButton} variant={theme} className={align} size={size} onClick={onClick} className={colorText} >{title}</Button>
    )
}

export default Btn; 