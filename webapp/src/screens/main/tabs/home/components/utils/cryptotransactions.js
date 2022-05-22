import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

function epsilonRound(num) {
    const zeros = 4;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Ctransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.axios = require('axios');
    }

    async componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{
                maxHeight: '36vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingTop: '5px',
                fontSize: '1.2rem',
                marginLeft: '10px',
                marginRight: '10px',
            }}>
                {this.props.transactions.map((item, index) => (
                    <Row md="3" key={index}>
                        <Col>
                            Date <br />
                            {item.date.toLocaleDateString()}
                        </Col>
                        <Col>
                            Amount <br /> {
                                epsilonRound(item.amount / 1000000000000000000) > 0 ?
                                    <span style={{
                                        color: '#009900'
                                    }}>{
                                            epsilonRound(item.amount / 1000000000000000000)
                                        }</span> :
                                    <span style={{
                                        color: '#ff0000'
                                    }}>{
                                            epsilonRound(item.amount / 1000000000000000000)
                                        }</span>
                            }
                        </Col>
                        <Col>
                            GasFee <br /> {
                                epsilonRound(item.gasFee / 1000000000000000000) > 0 ?
                                    epsilonRound(item.gasFee / 1000000000000000000)
                                    :
                                    ">0.001"
                            }
                        </Col>
                    </Row>
                ))}
            </div>
        );
    }
}

export default Ctransactions;