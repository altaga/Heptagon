import React, { Component } from 'react';
import reactAutobind from 'react-autobind';
import ConnectButton from './components/connectButton';
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import { getWeb3ReactContext } from '@web3-react/core';
import logo from '../../assets/img/logo.png';

const ContextModule = getWeb3ReactContext();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            error: null,
            user: "",//'strange@coinbase.com',
            password: "", //'toortoor1',
            connect: false,
            
        };
        reactAutobind(this);
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    login() {
        let config = {
            method: 'get',
            url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            headers: {
                'user': this.state.user,
                'pass': this.state.password
            }
        };
        this.axios(config)
            .then(async (response) => {
                if (response.data === "Error") {
                    console.log("Error");
                }
                else {
                    this.props.setEwallet(response.data);
                    this.setState({ connect: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='VerticalandHorizontal'>
                <img src={logo} alt="logo" className="logo" style={{
                    height: '100px',
                    paddingBottom: '20px'
                }} />
                <Card>
                    <CardHeader>
                        <h3>Login to Heptagon</h3>
                    </CardHeader>
                    <CardBody>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.user}
                            onChange={(e) => this.setState({ user: e.target.value })}
                        />
                        <div style={{ margin: "10px" }} />
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                        />
                        <div style={{ margin: "15px" }} />
                        <Row>
                            <Col>
                                <Button 
                                disabled={this.state.connect}
                                color="primary" className='roundButton' style={{ width: "100%" }} onClick={
                                    () => {
                                        this.login();
                                    }
                                }>
                                    Login
                                </Button>
                            </Col>
                            <Col>
                                <Button color="primary" className='roundButton' style={{ width: "100%" }}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardHeader style={{ borderTopColor: "#e7e7e7", borderTopWidth: "1px", borderTopStyle: "solid" }}>
                        <h3>Connect your Coinbase Wallet</h3>
                    </CardHeader>
                    <CardBody>
                        <ConnectButton connect={this.state.connect} changeScreen={this.props.changeScreen} />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Login;