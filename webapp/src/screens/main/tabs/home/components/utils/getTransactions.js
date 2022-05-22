import axios from 'axios';

export const getArbitrum = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}

export const getRopsten = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}

export const getFantom = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.ftmscan.com/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}

export const getBnb = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}

export const getAvax = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.snowtrace.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}

export const getPolygon = async (address) => {
    return new Promise((resolve, reject) => {
        var config = {
            method: 'get',
            url: `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=desc`,
            headers: {}
        };
        axios(config)
            .then((response) => {
                resolve(response.data.result.map((item) => (
                    {
                        amount: item.to.toLowerCase() === address.toLowerCase() ? item.value : -item.value,
                        gasFee: item.gasUsed,
                        date: new Date(item.timeStamp * 1000),
                        contractAddress : item.contractAddress,
                    }
                )));
            })
            .catch(function (error) {
                reject([]);
            });
    });
}
