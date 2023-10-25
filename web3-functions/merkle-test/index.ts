import {
    Web3Function,
    Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";

import Merkle from "./abis/Merkle.json";
import { MERKLE_TEST_WEB3_FUNCTION } from "./constants";

Web3Function.onRun(async (context: Web3FunctionContext) => {
    const { multiChainProvider } = context;

    const provider = multiChainProvider.default();

    let merkle;
    try {
        merkle = new Contract(MERKLE_TEST_WEB3_FUNCTION, Merkle, provider);

        return {
            canExec: true,
            callData: [
                {
                    to: MERKLE_TEST_WEB3_FUNCTION,
                    data: merkle.interface.encodeFunctionData(
                        "claim",
                        [[], 0, BigNumber.from("1666666666666666700000"), "0xDb1b024855AC829681818aa7ED021f65509321b5"],
                    ),
                },
            ],
        };
    } catch (error) {
        return { canExec: false, message: error };
    }
});
