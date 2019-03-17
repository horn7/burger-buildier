import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <Aux>
        <Backdrop show={props.show} />
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
            {props.children}
            <button>Zimno mi w stopy!</button>
        </div>
    </Aux>
)

export default modal;