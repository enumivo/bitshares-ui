/**
 * Settings storage for all Gateway Services
 * General API Settings are stored in api/apiConfig and should be imported here
 */

import {
    bitsparkAPIs,
    widechainAPIs,
    openledgerAPIs,
    cryptoBridgeAPIs,
    gdex2APIs
} from "api/apiConfig";
import {allowedGateway} from "branding";

export const availableGateways = {
    OPEN: {
        id: "OPEN",
        name: "OPENLEDGER",
        baseAPI: openledgerAPIs,
        isEnabled: allowedGateway("OPEN"),
        selected: false,
        options: {
            enabled: false,
            selected: false
        }
    },
    SPARKDEX: {
        id: "SPARKDEX",
        name: "SPARKDEX",
        baseAPI: bitsparkAPIs,
        isEnabled: allowedGateway("SPARKDEX"),
        selected: false,
        options: {
            enabled: false,
            selected: false
        }
    },
    WIN: {
        id: "WIN",
        name: "Winex",
        baseAPI: widechainAPIs,
        isEnabled: allowedGateway("WIN"),
        selected: false,
        options: {
            enabled: false,
            selected: false
        }
    },
    BRIDGE: {
        id: "BRIDGE",
        name: "CRYPTO-BRIDGE",
        baseAPI: cryptoBridgeAPIs,
        isEnabled: allowedGateway("BRIDGE"),
        selected: false,
        singleWallet: true, // Has no coresponging coinType == backingCoinType specific wallet
        addressValidatorAsset: true, // Address validator requires output_asset parameter
        useFullAssetName: true, // Adds <gateway>.<asset> to memo and address object
        intermediateAccount: "cryptobridge", // Fixed intermediateAccount
        options: {
            enabled: false,
            selected: false
        }
    },
    GDEX: {
        id: "GDEX",
        name: "GDEX",
        baseAPI: gdex2APIs,
        isEnabled: allowedGateway("GDEX"),
        options: {
            enabled: false,
            selected: false
        }
    }
};

export const gatewayPrefixes = Object.keys(availableGateways);

export function getPossibleGatewayPrefixes(bases) {
    return gatewayPrefixes.reduce((assets, prefix) => {
        bases.forEach(a => {
            assets.push(`${prefix}.${a}`);
        });
        return assets;
    }, []);
}

export default availableGateways;
