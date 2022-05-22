import React, { Component } from 'react';
import ContextModule from '../../../../../utils/contextModule';
import Transactions from './utils/transactions';

function filterJSONarray(array, key, value) {
    try {
        return array.filter(obj => obj[key] === value);
    }
    catch (err) {
        return [];
    }
}

class Fiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 1,
            transactions: [],
        };
        this.axios = require('axios');
    }

    static contextType = ContextModule;

    componentDidMount() {
        var config = {
            method: 'get',
            url: 'URL',
            headers: {
                'ewallet': this.context.value.ewallet,
            }
        };
        this.axios(config)
            .then((response) => {
                const myArray = filterJSONarray(response.data.data.accounts, "currency", "USD")
                if (myArray.length > 0) {
                    this.context.setValue({
                        balance: myArray[0].balance,
                    });
                }
                else {
                    console.log("No Balance");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        var config2 = {
            method: 'get',
            url: 'URL',
            headers: {
                'ewallet': this.context.value.ewallet,
            }
        };
        this.axios(config2)
            .then((response) => {
                const myJSON = filterJSONarray(response.data.data, "currency", "USD")
                this.setState({
                    transactions: myJSON
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div style={{
                    fontSize: '1.5rem',
                }}>
                    Fiat Wallet: {this.context.value.balance} USD
                </div>
                <hr />
                <div style={{
                    fontSize: '1.5rem',
                }}>
                    Transactions:
                </div>
                <div>
                    <Transactions transactions={this.state.transactions} />
                </div>
            </div>
        );
    }
}

export default Fiat;