import React, { Component } from 'react';
import { getWeb3ReactContext } from '@web3-react/core';
import { formatEther } from "@ethersproject/units"
import { connectors } from '../../../../login/components/connectors';
import { networks } from './utils/networks'
import Ctransactions from './utils/cryptotransactions';
import { isMobile } from 'react-device-detect';

const ContextModule = getWeb3ReactContext();

function epsilonRound(num) {
    const zeros = 6;
    return Math.round((num + Number.EPSILON) * Math.pow(10, zeros)) / Math.pow(10, zeros)
}

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            account: "",
            provider: "",
            transactions: []
        };

    }

    static contextType = ContextModule;

    componentDidMount() {
        let provider = isMobile ? "coinbaseWallet" : window.localStorage.getItem("provider");
        if (provider) {
            if (!this.context.active) {
                this.context.activate(connectors[provider]).then(() => {
                    provider = this.context.library
                    if (this.context.active && this.context.account) {
                        provider?.getBalance(this.context.account).then(async (result) => {
                            const res = await networks[this.context.chainId].getTransactions(this.context.account);
                            this.setState({
                                account: this.context.account,
                                balance: Number(formatEther(result)),
                                provider: networks[this.context.chainId],
                                transactions: res
                            })
                        })
                    }
                });
            }
            else {
                provider = this.context.library
                if (this.context.active && this.context.account) {
                    provider?.getBalance(this.context.account).then(async (result) => {
                        const res = await networks[this.context.chainId].getTransactions(this.context.account);
                        this.setState({
                            account: this.context.account,
                            balance: Number(formatEther(result)),
                            provider: networks[this.context.chainId],
                            transactions: res
                        })
                    })
                }
            }
        }

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div style={{
                height: '100%',
                fontSize: '1.4em',
                paddingBottom: '10px',
            }}>
                <div>
                    <a
                        href={`${this.state.provider.explorer}address/${this.state.account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {"\n" + this.state.account.substring(0, 21) + "\n" + this.state.account.substring(21, 42)}
                    </a>
                </div>
                <div>
                    Network :
                    <span style={{
                        color: this.state.provider.color
                    }}>
                        {" "}{this.state.provider.name}
                    </span>
                </div>
                <div>
                    Balance:{" "} {epsilonRound(this.state.balance)}{" "} &nbsp;
                    {
                        this.state.provider.icon && <img src={this.state.provider.icon} alt="icon" width="30px"></img>
                    }
                </div>
                <hr />
                <div style={{ paddingBottom: "10px" }}>
                    Transactions:
                </div>
                <div>
                    <Ctransactions transactions={this.state.transactions} />
                </div>
            </div>
        );
    }
}

export default Crypto;