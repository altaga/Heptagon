import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import Crypto from './components/crypto';
import Fiat from './components/fiat';
import Verify from './components/verify';
import NFT from './components/nft';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selector: 0,
            nftFlag: false
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{ paddingTop: "16px" }} >
                <Row md="1">
                    <Col xs="12">
                        <Button color="primary" className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder" }} onClick={() => {
                            if (this.state.selector === 1) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 1
                                })
                            }
                        }}>
                            Fiat Account
                        </Button>
                        <div
                            hidden={this.state.selector !== 1}
                            style={{
                                marginTop: "5px",
                                maxHeight: "71.8vh",
                            }}>
                            <Fiat />
                        </div>
                    </Col>
                    <div style={{ paddingTop: "4px" }} />
                    <Col xs="12">
                        <Button color="primary" className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder" }} onClick={() => {
                            if (this.state.selector === 2) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 2
                                })
                            }
                        }}>
                            Crypto Account
                        </Button>
                        <div
                            hidden={this.state.selector !== 2}
                            style={{
                                marginTop: "5px",
                                maxHeight: "64vh",
                            }}>
                            <Crypto />
                        </div>
                    </Col>
                    {
                        this.props.nft.length > 0 &&
                        <>
                            <div style={{ paddingTop: "4px" }} />
                            <Col xs="12">
                                <Button color="primary" className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder" }} onClick={() => {
                                    if (this.state.selector === 4) {
                                        this.setState({
                                            selector: 0
                                        })
                                    }
                                    else {
                                        this.setState({
                                            selector: 4
                                        })
                                    }
                                }}>
                                    NFT Collection
                                </Button>
                                <div
                                    hidden={this.state.selector !== 4}
                                    style={{
                                        marginTop: "5px",
                                        maxHeight: "56.4vh",
                                    }}>
                                    <NFT nft={this.props.nft} />
                                </div>
                            </Col>
                        </>
                    }
                    <div style={{ paddingTop: "4px" }} />
                    <Col xs="12">
                        <Button color="primary" className='roundButton' style={{ width: "90vw", fontSize: "1.5rem", fontWeight: "bolder" }} onClick={() => {
                            if (this.state.selector === 3) {
                                this.setState({
                                    selector: 0
                                })
                            }
                            else {
                                this.setState({
                                    selector: 3
                                })
                            }
                        }}>
                            Verify
                        </Button>
                        <div
                            hidden={this.state.selector !== 3}
                            style={{
                                marginTop: "5px",
                                maxHeight: "56.4vh",
                            }}>
                            <Verify />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;