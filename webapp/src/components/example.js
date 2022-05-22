import React, { Component } from 'react';
import {getWeb3ReactContext} from '@web3-react/core';

const ContextModule = getWeb3ReactContext();

class Example extends Component {
    constructor(props) {
        super(props);

    }

    static contextType = ContextModule;

    componentDidMount() {
        console.log(this.context);
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Example;