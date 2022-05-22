import React, { Component } from 'react';
import { getWeb3ReactContext } from '@web3-react/core';
import { connectors } from "./connectors";
import reactAutobind from 'react-autobind';
import { Button, Col, Input, Row } from 'reactstrap';
import { toHex } from '../../../utils/utils';
import { isMobile } from 'react-device-detect';

const ContextModule = getWeb3ReactContext();

const networks = {
    43113: {
        name: 'Avalanche Fuji',
        chainId: 43113
    },
    97: {
        name: 'Binance Smart Chain Testnet',
        chainId: 97
    },
    4002: {
        name: 'Fantom Testnet',
        chainId: 4002
    },
    3: {
        name: 'Ropsten',
        chainId: 3
    },
    80001: {
        name: 'Polygon Testnet',
        chainId: 80001
    }
};

class ConnectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            error: null,
            network: null
        };
        reactAutobind(this);
    }

    static contextType = ContextModule;

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    login() {
        if (!this.context.active) {
            this.context.activate(connectors.coinbaseWallet).then(() => {
                console.log("Connected");
            });
        } else {
            this.context.deactivate();
        }
    }

    async switchNetwork(network) {
        try {
            await this.context.library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(network) }]
            });
            /*
            if (this.context.active && this.context.account) {
                this.context.library?.getBalance(this.context.account).then((result) => {
                    this.props.setBalance(result * 10 ** -18);
                })
            }
            */
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await this.context.library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [networkParams[toHex(network)]]
                    });
                } catch (error) {
                    setError(error);
                }
            }
        }
    };

    onChange(event) {
        const provider = isMobile ? "coinbaseWallet" : window.localStorage.getItem("provider");
        if (provider) {
            if (this.context.active) {
                const id = event.target.value;
                this.switchNetwork(Number(id));
                this.setState({
                    network: networks[event.target.value].name
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Row md="1">
                    <Col xs={12}>
                        <Button disabled={!this.props.connect} className='roundButton' style={{ width: "80vw" }} color="primary" onClick={this.login}>{
                            this.context.active ? 'Disconnect' : 'Connect'
                        }</Button>
                    </Col>
                    <Col xs={12} style={{ paddingTop: "2vh" }}>
                        <Input disabled={!this.context.active} value={this.context.chainId ? this.context.chainId : 0} type="select" name="select" id="exampleSelect" onChange={this.onChange}>
                            <option disabled value={0}>Select Provider</option>
                            {
                                Object.keys(networks).map(key => networks[key]).map(network => (
                                    <option key={network.chainId} value={network.chainId}>{network.name}</option>
                                ))
                            }
                        </Input>
                    </Col>
                    <Col xs={12} style={{ paddingTop: "2vh" }}>
                        <Button className='roundButton' disabled={!this.context.active} style={{ width: "80vw" }} color="primary" onClick={() => this.props.changeScreen(2)}>
                            Start App
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ConnectButton;