import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './common.scss';
import './app.scss';

import Header from './header.js';
import UnitsList from './unitsList.js';
import Content from './content.js';
import Footer from './footer.js';
import Preview from './preview.js'

class App extends React.Component {

    componentWillMount() {
        
    }

    componentDidMount() {
        
    }
    render() {
        
        return (
            <div className="window">
                <Header />
                <div className="m-body f-cb">
                    <UnitsList />
                    <Content />
                    <Preview />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App
