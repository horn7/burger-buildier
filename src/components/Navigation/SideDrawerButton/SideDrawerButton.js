import React from 'react';
import classes from './SideDrawerButton.css';

const sideDrawerButton = props => {
    let attachedClass = [classes.SideDrawerButton];
    if(props.open){
        attachedClass = [classes.SideDrawerButton, classes.open];
    }
    return (
        <div 
            className={attachedClass.join(' ')}
            onClick={props.sideDrawtoggle}    
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
        </div>
    )
}

export default sideDrawerButton;