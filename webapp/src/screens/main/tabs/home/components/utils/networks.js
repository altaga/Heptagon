import polygon from "../../../../../../assets/img/polygon.png";
import eth from "../../../../../../assets/img/eth.png";
import avax from "../../../../../../assets/img/avax.png";
import bnb from "../../../../../../assets/img/bnb.png";
import ftm from "../../../../../../assets/img/ftm.png";
import {
    getPolygon,
    getAvax,
    getRopsten,
    getBnb,
    getFantom
} from "./getTransactions";

import {
    getNFTArbitrum,
    getNFTPolygon,
    getNFTAvax,
    getNFTBnb,
    getNFTFantom,
    getNFTRopsten
} from "./getNFT";

export const networks = {
    /*
    421611: {
        name: 'Arbitrum Rinkeby',
        chainId: 421611,
        symbol : 'ETH',
        explorer: 'https://testnet.arbiscan.io/',
        color : '#28A0F0',
        icon : eth,
        getTransactions: getArbitrum
    },
    */
    43113: {
        name: 'Avalanche Fuji',
        chainId: 43113,
        symbol : 'AVAX',
        explorer: 'https://testnet.snowtrace.io/',
        color : '#E84142',
        icon : avax,
        getTransactions: getAvax,
        contractAddress: '0x39986fC939433c49d5f083B61c3Bb49A16475042',
        getNFT: getNFTAvax
    },
    97: {
        name: 'BSC Testnet',
        chainId: 97,
        symbol : 'BNB',
        explorer: 'https://testnet.bscscan.com/',
        color : '#F0B90B',
        icon : bnb,
        getTransactions: getBnb,
        contractAddress: '0x39986fC939433c49d5f083B61c3Bb49A16475042',
        getNFT: getNFTBnb
    },
    4002: {
        name: 'Fantom Testnet',
        chainId: 4002,
        symbol : 'FTM',
        explorer: 'https://testnet.ftmscan.com/',
        color : 'gray',
        icon : ftm,
        getTransactions: getFantom,
        contractAddress: '0xfD88ab981B7132EFdFA8a53FB1ff5D5C7a6C8114',
        getNFT: getNFTFantom
    },
    3: {
        name: 'Ropsten',
        chainId: 3,
        symbol : 'ETH',
        explorer: 'https://ropsten.etherscan.io/',
        color : '#21325B',
        icon : eth,
        getTransactions: getRopsten,
        contractAddress: '0x39986fC939433c49d5f083B61c3Bb49A16475042',
        getNFT: getNFTRopsten
    },
    80001: {
        name: 'Polygon Testnet',
        chainId: 80001,
        symbol : 'MATIC',
        explorer: 'https://mumbai.polygonscan.com/',
        color : '#8247E5',
        icon : polygon,
        getTransactions: getPolygon,
        contractAddress: '0x84b37E30C8E44d51A9C4e4654665b06EC54FC13F',
        getNFT: getNFTPolygon
    }
};