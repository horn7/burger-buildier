import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawOpenHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    sideDrawToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar 
                    open={this.state.showSideDrawer} 
                    sideDrawtoggle={this.sideDrawToggleHandler}   
                />
                <SideDraw 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawClosedHandler}    
                    sideDrawtoggle={this.sideDrawToggleHandler}               
                />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        );
    }
}


export default Layout;