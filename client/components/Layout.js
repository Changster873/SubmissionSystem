import React from 'react';
import Head from 'next/head';

export default class Layout extends React.Component {
    render () {
        return (
            // wraps the whole structure
            <div>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous"
                    />
                    <link href="../style.css" rel="stylesheet"/>
                </Head>
                <div className='wrapper' style={{background: 'black', paddingBottom: `70%`}}>
                    {/* its contents */}
                    <div className='container'>
                            {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}