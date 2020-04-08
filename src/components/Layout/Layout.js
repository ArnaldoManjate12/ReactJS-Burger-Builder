import React , {Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import  './Layout.css';

const Layout = (props) => {
    return (
        <Fragment>
           <Toolbar />
            <main className="Content">
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;