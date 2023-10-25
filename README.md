# Pounder Web3 Functions

Within the architecture of the [pounder](https://github.com/HumpysGold/pounder/tree/main), there is a component that requires activation using data residing in web2. To bridge this data into the smart contract, our team is utilizing [Gelato web3 functions](https://docs.gelato.network/developer-services/web3-functions). 

This integration enables us to fetch proofs from Paladin endpoint and trigger the [harvestPaladinDelegate](https://github.com/HumpysGold/pounder/blob/main/src/AuraStrategy.sol#L351) method at our preferred cadence through automated means.

## Project Setup
1. Install project dependencies
```
yarn install
```

2. Configure your local environment: 
- Copy `.env.example` to init your own `.env` file
```
cp .env.example .env
```
- Complete your `.env` file with your private settings
```
PROVIDER_URLS="" # your provider URLS seperated by comma (e.g. https://eth-mainnet.alchemyapi.io/v2/YOUR_ALCHEMY_ID,https://eth-goerli.alchemyapi.io/v2/YOUR_ALCHEMY_ID)

PRIVATE_KEY="" # optional: only needed if you wish to create a task from the CLI instead of the UI
```

## Test Harvest paladin function

- Use `npx w3f test web3-functions/harvest-paladin/index.ts --logs` command to test

- Options:
  - `--logs` Show internal Web3 Function logs
  - `--debug` Show Runtime debug messages

- Output:
```
Web3Function running logs:
> Rewards arguments position0:
>           token=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
>           amount=522386
>           proofs=0x531eaa5409d7d69bea6645df992dacb1b2a17e7a5a4f40bb0fa47411c6b398a8,0x91db90465cb3a03210c86b482dc80ed0b10081c2e5fb24cdb7b9107591d948ed,0x55a4738738f002d7c1c7971057bac1415c9753496b9056f5e5e49a34c99f6b13,0x1a075c0ab836c8fd208522935fb934a14bf744369d44a066c67dadb9a1840bd0,0xa02c98fbe0b3067b33af657d5a7c1d50d34476348ead5b0eda77769142f8152e
>           index=7
>           chainId=137
> Rewards arguments position1:
>           token=0x255707B70BF90aa112006E1b07B9AeA6De021424
>           amount=54968099310608625233992
>           proofs=0xa2a8af8e03f6beaf6fe0ac69122ad77d431caec601b924f6f6623e64631423a5,0x55555df391d6deeb5528b2d5af9ebbde90834e494a70b981376119e159c1e9be
>           index=1
>           chainId=137
> Rewards arguments position2:
>           token=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
>           amount=98932371
>           proofs=0xe5840e80c178cc7c861695155f51c43f8eaa3af1340f6fd6fa5fed248ba4fb20,0x5a85107058447ce4d0194c8b3cbadc452c2c71f7f5066a29a20d0fa6be973025,0xcb99ed9ac688a622b2e27104aeedf1931603ff3308a55ffde755909701d3fe2a,0x52d1f63e39f63452ee58648d00a68a99ed14a72f217c5042db58b6d0f285c8cd,0x58757dea685d0716c096b5f3cd04fb46fd0bbfc2ca547d7d14aa237123a27cf9
>           index=25
>           chainId=1

Web3Function Result:
 ✓ Return value: {
  canExec: true,
  callData: [
    {
      to: '0x512fce9B07Ce64590849115EE6B32fd40eC0f5F3',
      data: '0xec7b768500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000002800000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000007f89200000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000005531eaa5409d7d69bea6645df992dacb1b2a17e7a5a4f40bb0fa47411c6b398a891db90465cb3a03210c86b482dc80ed0b10081c2e5fb24cdb7b9107591d948ed55a4738738f002d7c1c7971057bac1415c9753496b9056f5e5e49a34c99f6b131a075c0ab836c8fd208522935fb934a14bf744369d44a066c67dadb9a1840bd0a02c98fbe0b3067b33af657d5a7c1d50d34476348ead5b0eda77769142f8152e000000000000000000000000255707b70bf90aa112006e1b07b9aea6de0214240000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000ba3d39e5186d568f04800000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002a2a8af8e03f6beaf6fe0ac69122ad77d431caec601b924f6f6623e64631423a555555df391d6deeb5528b2d5af9ebbde90834e494a70b981376119e159c1e9be000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000005e5969300000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000005e5840e80c178cc7c861695155f51c43f8eaa3af1340f6fd6fa5fed248ba4fb205a85107058447ce4d0194c8b3cbadc452c2c71f7f5066a29a20d0fa6be973025cb99ed9ac688a622b2e27104aeedf1931603ff3308a55ffde755909701d3fe2a52d1f63e39f63452ee58648d00a68a99ed14a72f217c5042db58b6d0f285c8cd58757dea685d0716c096b5f3cd04fb46fd0bbfc2ca547d7d14aa237123a27cf9'
    }
  ]
}
  ```


## Harvest Paladin web3 function deployment

Run:

```
npx w3f deploy web3-functions/harvest-paladin/index.ts
```

## Testnet Deployments

- `Web3 Function Gelato ID Testnet`: [TEST_MERKLE](https://beta.app.gelato.network/task/0x8ce016386766ce2753bfb1762be802d48fa0abd944968fe2ae1b1b0c2e59d5fa?chainId=5)

- `Ipfs CID Testnet`: [Qmaf73G62WXymhrqnEQTa6ePTR9gBybVxh9aLwCToMZPmH](https://api.gelato.digital/automate/users/users/web3-function/Qmaf73G62WXymhrqnEQTa6ePTR9gBybVxh9aLwCToMZPmH/source)

- `Funding wallet`: [0xDb1b024855AC829681818aa7ED021f65509321b5](https://etherscan.io/address/0xDb1b024855AC829681818aa7ED021f65509321b5)

