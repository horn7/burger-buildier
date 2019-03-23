import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerButton from '../SideDrawerButton/SideDrawerButton';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly}>
            <SideDrawerButton
                open={props.open}
                sideDrawtoggle={props.sideDrawtoggle}
            />
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems /> 
        </nav>
              
    </header>
)

export default toolbar;