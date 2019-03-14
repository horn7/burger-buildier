import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js';

const controls = [
    {label: 'Sałata', type: 'salad'},
    {label: 'Bekon', type: 'bacon'},
    {label: 'Ser', type: 'cheese'},
    {label: 'Mięso', type: 'meat'}
];

const BuildControls = props => (
    <div className={classes.BuildControls}>
        { controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientsAdded(ctrl.type)}
                    removed={() => props.ingredientsRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
        ))}
    </div>
)

export default BuildControls;