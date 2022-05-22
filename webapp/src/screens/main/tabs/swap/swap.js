import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { formatEther } from "@ethersproject/units"
import { getWeb3ReactContext } from '@web3-react/core';
import { networks } from "./utils/networks";
import { connectors } from '../../../login/components/connectors';
import { isMobile } from 'react-device-detect';
import reactAutobind from 'react-autobind';

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

function lowThan(value, fiat, crypto, flag) {
    if (!flag) {
        return value <= fiat;
    }
    else {
        return value <= crypto;
    }
}

function epsilonRound(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const ContextModule = getWeb3ReactContext();

class Swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            up: 0,
            down: 0,
            account: '',
            balance: 0,
            fiatBalance: 0,
            provider: {
                symbol: '',
            },
            price: 0,
            flag: false,
            loading: false,
        }
        this.axios = require('axios')
        reactAutobind(this);
    }

    static contextType = ContextModule;

    componentDidMount() {
        this.setState({
            loading: true,
        })
        // Crypto
        let provider = isMobile ? "coinbaseWallet" : window.localStorage.getItem("provider");
        if (provider) {
            if (!this.context.active) {
                this.context.activate(connectors[provider]).then(() => {
                    provider = this.context.library
                    if (this.context.active && this.context.account) {
                        provider?.getBalance(this.context.account).then(async (result) => {
                            const res = await networks[this.context.chainId].getPrice();
                            console.log("Crypto:" + Number(formatEther(result)))
                            this.setState({
                                account: this.context.account,
                                balance: Number(formatEther(result)),
                                provider: networks[this.context.chainId],
                                transactions: res,
                                price: res,
                                loading: false,
                            })
                        })
                    }
                });
            }
            else {
                provider = this.context.library
                if (this.context.active && this.context.account) {
                    provider?.getBalance(this.context.account).then(async (result) => {
                        const res = await networks[this.context.chainId].getPrice();
                        console.log("Crypto:" + Number(formatEther(result)))
                        this.setState({
                            account: this.context.account,
                            balance: Number(formatEther(result)),
                            provider: networks[this.context.chainId],
                            transactions: res,
                            price: res,
                            loading: false,
                        })
                    })
                }
            }
        }

        // Fiat

        var config = {
            method: 'get',
            url: 'URL',
            headers: {
                'ewallet': this.props.ewallet,
            }
        };
        this.axios(config)
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.setState({
                        fiatBalance: myArray[0].balance,
                    });
                    console.log("Fiat:" + myArray[0].balance)
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillUnmount() {

    }

    async Crypto2Fiat() {
        this.setState({
            loading: true,
        })
        this.axios({
            method: 'get',
            url: 'URL',
            headers: {
                'ewallets': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'ewalletd': this.props.ewallet,
                'amount': epsilonRound(this.state.down).toString(),
                'currency': "USD"
            }
        })
            .then((response) => {
                console.log(response.data);
                this.axios({
                    method: 'get',
                    url: 'URL',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                })
                    .then(() => {
                        const ethers = require('ethers');
                        const provider = new ethers.providers.Web3Provider(this.context.library.provider, "any");
                        const signer = provider.getSigner();
                        // Creating a transaction param
                        const tx = {
                            from: this.state.account,
                            to: '0xcF2F7040801cfA272D68CD37c8FD7D9fb84D65D8',
                            value: ethers.utils.parseEther(this.state.up.toString()),
                        };
                        signer.sendTransaction(tx).then((transaction) => {
                            console.log(transaction);
                            this.setState({
                                loading: false,
                            })
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async Fiat2Crypto() {
        this.axios({
            method: 'get',
            url: 'URL',
            headers: {
                'ewallets': this.props.ewallet,
                'ewalletd': "ewallet_d02b0876cf85ffe5ed92ab3cbdbc725a",
                'amount': this.state.up.toString(),
                'currency': "USD"
            }
        })
            .then((response) => {
                this.axios({
                    method: 'get',
                    url: 'URL',
                    headers: {
                        'id': response.data.data.id,
                        'status': 'accept'
                    },
                })
                    .then(() => {
                        this.axios({
                            method: 'get',
                            url: 'URL/send',
                            headers: {
                                'to': this.context.account,
                                'amount': this.state.down.toString(),
                                'chainid': this.context.chainId.toString(),
                            }
                        })
                            .then( (response) => {
                                console.log(response);
                                this.setState({
                                    loading: false,
                                }) 
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async transaction() {
        if (this.state.flag) {
            this.Crypto2Fiat();
        }
        else {
            this.Fiat2Crypto();
        }
    }

    render() {
        return (
            <div style={{
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Input
                    type="number"
                    name="number"
                    id="number"
                    value={this.state.up ? this.state.up : ""}
                    placeholder={"From " + (this.state.flag ? this.state.provider.symbol + "" : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #0d6efd',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                    onChange={(e) => {
                        if (this.state.flag) {
                            this.setState({
                                up: e.target.value,
                                down: e.target.value * this.state.price,
                            })
                        }
                        else {
                            this.setState({
                                up: e.target.value,
                                down: e.target.value / this.state.price,
                            })
                        }
                    }}
                />
                <Button color="primary" className='roundButton' style={{ fontWeight: "bolder" }} onClick={() => this.setState({
                    up: this.state.down,
                    down: this.state.up,
                    flag: !this.state.flag
                })}>
                    <SwapVertIcon />
                </Button>
                <Input
                    value={this.state.down ? this.state.down : ""}
                    type="number"
                    name="number"
                    id="number"
                    disabled
                    placeholder={"To " + (!this.state.flag ? this.state.provider.symbol : "USD")}
                    style={{
                        width: '80%',
                        height: '50px',
                        borderRadius: '25px',
                        border: '2px solid #0d6efd',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: '10px',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}
                />
                <br />
                <Button
                disabled={this.state.loading}
                color="primary" className='roundButton' style={{ fontWeight: "bolder", fontSize: "1.5rem" }} onClick={() => {
                    this.transaction();
                }}>
                    {
                        this.state.loading ?
                            "Swapping..." :
                            "Swap"
                    }
                </Button>
            </div>
        );
    }
}

export default Swap;