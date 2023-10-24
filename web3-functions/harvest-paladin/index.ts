import {
    Web3Function,
    Web3FunctionContext,
  } from "@gelatonetwork/web3-functions-sdk";
  import { Contract } from "@ethersproject/contracts";
  
  import getPaladinProofs from "./getPaladinProofs";
  
  import AuraStrategy from "./abis/AuraStrategy.json";
  import { AURA_STRATEGY } from "./constants";
  
  Web3Function.onRun(async (context: Web3FunctionContext) => {
    const { userArgs, gelatoArgs, multiChainProvider } = context;
  
    const provider = multiChainProvider.default();
  
    let strategy;
    try {
      strategy = new Contract(AURA_STRATEGY, AuraStrategy, provider);
  
      const rewardsResponse = await getPaladinProofs();
      let claimLen = rewardsResponse.length;
      if (claimLen == 0) {
        return {
          canExec: false,
          message: `Not rewards details available, array empty!`,
        };
      }
  
      let arrayClaimParams = [];
  
      for (let i = 0; i < claimLen; i++) {
        const claimParams = rewardsResponse[i];

        /*
            struct ClaimParams {
                address token;
                uint256 index;
                uint256 amount;
                bytes32[] merkleProof;
            }
        */
        arrayClaimParams.push([
          claimParams.token,
          claimParams.index,
          claimParams.amount,
          claimParams.proofs,
        ]);

        console.log(`Rewards arguments position${i}:
          token=${claimParams.token}
          amount=${claimParams.amount}
          proofs=${claimParams.proofs}
          index=${claimParams.index}
          chainId=${claimParams.chainId}`);
      }
  
      return {
        canExec: true,
        callData: strategy.interface.encodeFunctionData(
          "harvestPaladinDelegate",
          [arrayClaimParams],
        ),
      };
    } catch (error) {
      return { canExec: false, message: error };
    }
  });
  