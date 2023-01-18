import { HardhatUserConfig } from 'hardhat/types'
import '@typechain/hardhat'
import '@typechain/ethers-v5'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-solhint'
import 'hardhat-deploy'
// import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@primitivefi/hardhat-dodoc'
import '@nomiclabs/hardhat-etherscan'

import 'tsconfig-paths/register'

// import tasks
import 'tasks/reset'
import 'tasks/createSplit'
import 'tasks/seedAccount'
import 'tasks/estimateGas'

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const {
  MAINNET_RPC_URL,
  GOERLI_RPC_URL,
  POLYGON_RPC_URL,
  POLYGON_MUMBAI_RPC_URL,
  OPT_RPC_URL,
  OPT_GOERLI_RPC_URL,
  ARB_RPC_URL,
  ARB_GOERLI_RPC_URL,

  GNO_RPC_URL,
  GNO_CHIADO_RPC_URL,
  FTM_RPC_URL,
  FTM_TEST_RPC_URL,

  MAINNET_ETHERSCAN_API_KEY,
  POLYGON_ETHERSCAN_API_KEY,
  OPT_ETHERSCAN_API_KEY,
  ARB_ETHERSCAN_API_KEY,

  GNO_ETHERSCAN_API_KEY,
  FTM_ETHERSCAN_API_KEY,

  PRIVATE_KEY,
  REPORT_GAS,
} = process.env

const accounts = PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : 'remote'

const config: HardhatUserConfig = {
  // solidity: '0.8.4',
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            // runs: 999999,
          },
        },
      },
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // typechain: {
  //   outDir: 'src/types',
  //   target: 'ethers-v5',
  // },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    // ethereum
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts,
    },
    // polygon
    polygon: {
      url: POLYGON_RPC_URL,
      accounts,
    },
    mumbai: {
      url: POLYGON_MUMBAI_RPC_URL,
      accounts,
    },
    // optimism
    optimism: {
      url: OPT_RPC_URL,
      accounts,
    },
    optimisticGoerli: {
      url: OPT_GOERLI_RPC_URL,
      accounts,
    },
    // arbitrum
    arbitrum: {
      url: ARB_RPC_URL,
      accounts,
    },
    arbitrumGoerli: {
      url: ARB_GOERLI_RPC_URL,
      accounts,
    },
    // gnosis
    gnosis: {
      url: GNO_RPC_URL,
      accounts,
    },
    gnosisChiado: {
      url: GNO_CHIADO_RPC_URL,
      accounts,
    },
    // ftm
    ftm: {
      url: FTM_RPC_URL,
      accounts,
    },
    ftmTestnet: {
      url: FTM_TEST_RPC_URL,
      accounts,
    },
    // localhost
    hardhat: {
      forking: {
        url: MAINNET_RPC_URL,
        blockNumber: 13852105,
      },
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: {
      // ethereum
      mainnet: MAINNET_ETHERSCAN_API_KEY,
      ropsten: MAINNET_ETHERSCAN_API_KEY,
      rinkeby: MAINNET_ETHERSCAN_API_KEY,
      goerli: MAINNET_ETHERSCAN_API_KEY,
      kovan: MAINNET_ETHERSCAN_API_KEY,
      // polygon
      polygon: POLYGON_ETHERSCAN_API_KEY,
      polygonMumbai: POLYGON_ETHERSCAN_API_KEY,
      // optimism
      optimisticEthereum: OPT_ETHERSCAN_API_KEY,
      optimisticGoerli: OPT_ETHERSCAN_API_KEY,
      // arbitrum
      arbitrumOne: ARB_ETHERSCAN_API_KEY,
      arbitrumGoerli: ARB_ETHERSCAN_API_KEY,
      // gnosis
      gnosis: GNO_ETHERSCAN_API_KEY,
      gnosisChiado: GNO_ETHERSCAN_API_KEY,
      // ftm
      ftm: FTM_ETHERSCAN_API_KEY,
      ftmTestnet: FTM_ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'optimisticGoerli',
        chainId: 420,
        urls: {
          apiURL: 'https://api-goerli-optimistic.etherscan.io/api',
          browserURL: 'https://goerli-optimism.etherscan.io/',
        },
      },
      {
        network: 'arbitrumGoerli',
        chainId: 421613,
        urls: {
          apiURL: 'https://goerli-rollup.arbitrum.io/rpc',
          browserURL: 'https://goerli-rollup-explorer.arbitrum.io/',
        },
      },
      {
        network: 'gnosis',
        chainId: 100,
        urls: {
          apiURL: 'https://api.gnosisscan.io/api',
          browserURL: 'https://gnosisscan.io/',
        },
      },
      {
        network: 'gnosisChiado',
        chainId: 10200,
        urls: {
          apiURL: 'https://blockscout.com/gnosis/chiado/api',
          browserURL: 'https://blockscout.com/gnosis/chiado/',
        },
      },
      {
        network: 'ftm',
        chainId: 250,
        urls: {
          apiURL: 'https://api.ftmscan.com/api',
          browserURL: 'https://ftmscan.com',
        },
      },
      {
        network: 'ftmTestnet',
        chainId: 4002,
        urls: {
          apiURL: 'https://api-testnet.ftmscan.com/api',
          browserURL: 'https://testnet.ftmscan.com',
        },
      },
    ],
  },
  gasReporter: {
    enabled: REPORT_GAS ? true : false,
  },
  mocha: {
    timeout: 50000,
  },
  dodoc: {
    exclude: ['Clones', 'ReverseRecords', 'SafeTransferLib', 'ERC20'],
  },
}

export default config
