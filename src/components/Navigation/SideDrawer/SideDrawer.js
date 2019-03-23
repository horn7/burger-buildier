import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxiliary';
import SideDrawerButton from '../SideDrawerButton/SideDrawerButton'

const sideDrawer = props => {
    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClass = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClass.join(' ')}>       
                <SideDrawerButton 
                    open={props.open}
                    sideDrawtoggle={props.sideDrawtoggle}
                />     
                <nav>
                    <NavigationItems />
                </nav>            
            </div>
        </Aux>
    )
}

export default sideDrawer;