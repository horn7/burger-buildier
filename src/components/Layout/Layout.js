import React from 'react';
import Aux from '../../hoc/auxiliary'

const layout = props => (
    <Aux>
        <div>Toolbar, sidebar, backdrop</div>
        <main>
            { props.children }
        </main>
    </Aux>
);

export default layout;