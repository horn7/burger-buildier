import React from 'react';
import classes from './BuildControl.css';

const buildControl = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Dodaj</button>
        <button className={classes.More}>Usuń</button>
    </div>
)

export default buildControl;