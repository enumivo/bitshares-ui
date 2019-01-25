import {Apis} from "eidosjs-ws";
import GatewayActions from "actions/GatewayActions";
import availableGateways, {gatewayPrefixes} from "common/gateways";
import counterpart from "counterpart";

export function getGatewayName(asset) {
    if (asset.get("issuer") === "1.2.0") {
        return counterpart.translate("exchange.native");
    }

    return null;
}

export function hasGatewayPrefix(name) {
    return false;
}

export function getGatewayStatusByAsset(
    selectedAsset,
    boolCheck = "depositAllowed"
) {
    let {gatewayStatus} = this.state;
    for (let g in gatewayStatus) {
        gatewayStatus[g].options.enabled = false;
        this.props.backedCoins.get(g.toUpperCase(), []).find(coin => {
            let backingCoin = coin.backingCoinType || coin.backingCoin;
            let isAvailable =
                typeof coin.isAvailable == "undefined" ||
                (typeof coin.isAvailable == "boolean" && coin.isAvailable);

            // Gateway has EOS.* asset names
            if (backingCoin.toUpperCase().indexOf("EOS.") !== -1) {
                let [_network, _coin] = backingCoin.split(".");
                backingCoin = _coin;
            }

            if (
                coin[boolCheck] &&
                isAvailable &&
                selectedAsset == backingCoin
            ) {
                gatewayStatus[g].options.enabled = true;
            }
        });
    }
    return gatewayStatus;
}

export function getIntermediateAccount(symbol, backedCoins) {
    let {selectedGateway} = getAssetAndGateway(symbol);
    let coin = getBackedCoin(symbol, backedCoins);
    if (!coin) return undefined;
    else return coin.intermediateAccount || coin.issuer;
}

export function getBackedCoin(symbol, backedCoins) {
    let {selectedGateway} = getAssetAndGateway(symbol);
    return (
        backedCoins.get(selectedGateway, []).find(c => {
            return c.symbol.toUpperCase() === symbol.toUpperCase();
        }) || {}
    );
}

export function getAssetAndGateway(symbol) {
    let [selectedGateway, selectedAsset] = symbol.split(".");
    return {selectedGateway, selectedAsset};
}

