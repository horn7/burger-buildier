import React from 'react';
import Aux from '../../hoc/auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Naviagation/Toolbar/Toolbar'

const layout = props => (
    <Aux>
        <Toolbar />
        <main className={classes.Content}>
            { props.children }
        </main>
    </Aux>
);

export default layout;