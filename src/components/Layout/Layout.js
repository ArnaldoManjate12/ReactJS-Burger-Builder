import React , {Fragment } from 'react';
import  './Layout.css';

const Layout = (props) => {
    return (
        <Fragment>
            <div> Toolbar ,Sidedraw , Backdrop</div>
            <main className="Content">
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;