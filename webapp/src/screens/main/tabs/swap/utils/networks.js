import polygon from "../../../../../assets/img/polygon.png";
import eth from "../../../../../assets/img/eth.png";
import avax from "../../../../../assets/img/avax.png";
import bnb from "../../../../../assets/img/bnb.png";
import ftm from "../../../../../assets/img/ftm.png";
import {
    getPricePolygon,
    getPriceAvax,
    getPriceRopsten,
    getPriceBSC,
    getPriceFantom
} from "./price";

export const networks = {
    43113: {
        name: 'Avalanche Fuji',
        chainId: 43113,
        symbol : 'AVAX',
        explorer: 'https://testnet.snowtrace.io/',
        color : '#E84142',
        icon : avax,
        getPrice: getPriceAvax
    },
    97: {
        name: 'BSC Testnet',
        chainId: 97,
        symbol : 'BNB',
        explorer: 'https://testnet.bscscan.com/',
        color : '#F0B90B',
        icon : bnb,
        getPrice: getPriceBSC
    },
    4002: {
        name: 'Fantom Testnet',
        chainId: 4002,
        symbol : 'FTM',
        explorer: 'https://testnet.ftmscan.com/',
        color : 'gray',
        icon : ftm,
        getPrice: getPriceFantom
    },
    3: {
        name: 'Ropsten',
        chainId: 3,
        symbol : 'ETH',
        explorer: 'https://ropsten.etherscan.io/',
        color : '#21325B',
        icon : eth,
        getPrice: getPriceRopsten
    },
    80001: {
        name: 'Polygon Testnet',
        chainId: 80001,
        symbol : 'MATIC',
        explorer: 'https://mumbai.polygonscan.com/',
        color : '#8247E5',
        icon : polygon,
        getPrice: getPricePolygon
    }
};