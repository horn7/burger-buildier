import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }
    sideDrawClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar />
                <SideDraw 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawClosedHandler} />
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        );
    }
}


export default Layout;