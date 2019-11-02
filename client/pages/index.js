import React from 'react'
import Layout from '../components/Layout';

export default class Welcome extends React.Component {
  render () {
    return (
        <Layout>
          <h1 className="welcome"> Welcome </h1>
        </Layout>
    );
  }
}
