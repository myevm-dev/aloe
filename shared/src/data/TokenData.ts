import { Token } from './Token';
import { arbitrum, optimism, mainnet, base, linea, scroll } from 'viem/chains';

import BrettLogo from '../assets/png/brett.png';
import EthenaLogo from '../assets/png/ethena.png';
import ToshiLogo from '../assets/png/toshi.png';
import {
  ApeLogo,
  ArbLogo,
  BadgerLogo,
  BaldLogo,
  BasedLogo,
  CbEthLogo,
  ConvexLogo,
  DaiLogo,
  DeezLogo,
  DegenLogo,
  FraxLogo,
  GmxLogo,
  LidoLogo,
  LyraLogo,
  MagicLogo,
  MakerLogo,
  MaticLogo,
  MimLogo,
  NounsLogo,
  NutsLogo,
  OpLogo,
  PerpLogo,
  PoolTogetherLogo,
  RplLogo,
  SnxLogo,
  UniLogo,
  UsdbcLogo,
  UsdcLogo,
  UsdtLogo,
  VeloLogo,
  WbtcLogo,
  WethLogo,
  WstEthLogo,
} from '../assets/svg/tokens';
import { Address } from 'viem';

const USDC_MAINNET = new Token(
  mainnet.id,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD Coin',
  UsdcLogo
);

const WBTC_MAINNET = new Token(
  mainnet.id,
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  8,
  'WBTC',
  'Wrapped Bitcoin',
  WbtcLogo
);

const WETH_MAINNET = new Token(
  mainnet.id,
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const WSTETH_MAINNET = new Token(
  mainnet.id,
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
  18,
  'wstETH',
  'Wrapped Liquid Staked Ether 2.0',
  WstEthLogo
);

const MKR_MAINNET = new Token(mainnet.id, '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', 18, 'MKR', 'Maker', MakerLogo);

const UNI_MAINNET = new Token(mainnet.id, '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 18, 'UNI', 'Uniswap', UniLogo);

const APE_MAINNET = new Token(mainnet.id, '0x4d224452801aced8b2f0aebe155379bb5d594381', 18, 'APE', 'ApeCoin', ApeLogo);

const RPL_MAINNET = new Token(
  mainnet.id,
  '0xd33526068d116ce69f19a9ee46f0bd304f21a51f',
  18,
  'RPL',
  'Rocket Pool Protocol',
  RplLogo
);

const MATIC_MAINNET = new Token(
  mainnet.id,
  '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  18,
  'MATIC',
  'Matic Token',
  MaticLogo
);

const LDO_MAINNET = new Token(
  mainnet.id,
  '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
  18,
  'LDO',
  'Lido DAO Token',
  LidoLogo
);

const CVX_MAINNET = new Token(
  mainnet.id,
  '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
  18,
  'CVX',
  'Convex Token',
  ConvexLogo
);

const BADGER_MAINNET = new Token(
  mainnet.id,
  '0x3472a5a71965499acd81997a54bba8d852c6e53d',
  18,
  'BADGER',
  'Badger',
  BadgerLogo
);

const ENA_MAINNET = new Token(mainnet.id, '0x57e114b691db790c35207b2e685d4a43181e6061', 18, 'ENA', 'ENA', EthenaLogo);

const DAI_OPTIMISM = new Token(
  optimism.id,
  '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  18,
  'DAI',
  'Dai Stablecoin',
  DaiLogo
);

const FRAX_OPTIMISM = new Token(
  optimism.id,
  '0x2e3d870790dc77a83dd1d18184acc7439a53f475',
  18,
  'FRAX',
  'Frax',
  FraxLogo
);

const LYRA_OPTIMISM = new Token(
  optimism.id,
  '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
  18,
  'LYRA',
  'Lyra Token',
  LyraLogo
);

const OP_OPTIMISM = new Token(optimism.id, '0x4200000000000000000000000000000000000042', 18, 'OP', 'Optimism', OpLogo);

const PERP_OPTIMISM = new Token(
  optimism.id,
  '0x9e1028f5f1d5ede59748ffcee5532509976840e0',
  18,
  'PERP',
  'Perpetual',
  PerpLogo
);

const UNI_OPTIMISM = new Token(
  optimism.id,
  '0x6fd9d7ad17242c41f7131d257212c54a0e816691',
  18,
  'UNI',
  'Uniswap',
  UniLogo
);

const BRIDGED_USDC_OPTIMISM = new Token(
  optimism.id,
  '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
  6,
  'USDC.e',
  'USD Coin',
  UsdcLogo
);

const USDC_OPTIMISM = new Token(
  optimism.id,
  '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
  6,
  'USDC',
  'USD Coin',
  UsdcLogo
);

const USDT_OPTIMISM = new Token(
  optimism.id,
  '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
  6,
  'USDT',
  'Tether USD',
  UsdtLogo
);

const VELO_OPTIMISM = new Token(
  optimism.id,
  '0x3c8b650257cfb5f272f799f5e2b4e65093a11a05',
  18,
  'VELO',
  'Velodrome',
  VeloLogo
);

const WBTC_OPTIMISM = new Token(
  optimism.id,
  '0x68f180fcce6836688e9084f035309e29bf0a2095',
  8,
  'WBTC',
  'Wrapped Bitcoin',
  WbtcLogo
);

const WETH_OPTIMISM = new Token(
  optimism.id,
  '0x4200000000000000000000000000000000000006',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const WSTETH_OPTIMISM = new Token(
  optimism.id,
  '0x1f32b1c2345538c0c6f582fcb022739c4a194ebb',
  18,
  'wstETH',
  'Wrapped Liquid Staked Ether 2.0',
  WstEthLogo
);

const POOLTOGETHER_OPTIMISM = new Token(
  optimism.id,
  '0x395ae52bb17aef68c2888d941736a71dc6d4e125',
  18,
  'POOL',
  'PoolTogether',
  PoolTogetherLogo
);

const SNX_OPTIMISM = new Token(
  optimism.id,
  '0x8700daec35af8ff88c16bdf0418774cb3d7599b4',
  18,
  'SNX',
  'Synthetix Network Token',
  SnxLogo
);

const DAI_ARBITRUM = new Token(
  arbitrum.id,
  '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  18,
  'DAI',
  'Dai Stablecoin',
  DaiLogo
);

const GMX_ARBITRUM = new Token(arbitrum.id, '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a', 18, 'GMX', 'GMX', GmxLogo);

const MAGIC_ARBITRUM = new Token(
  arbitrum.id,
  '0x539bde0d7dbd336b79148aa742883198bbf60342',
  18,
  'MAGIC',
  'MAGIC',
  MagicLogo
);

const MAGIC_INTERNET_MONEY_ARBITRUM = new Token(
  arbitrum.id,
  '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
  18,
  'MIM',
  'Magic Internet Money',
  MimLogo
);

const BRIDGED_USDC_ARBITRUM = new Token(
  arbitrum.id,
  '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  6,
  'USDC.e',
  'Bridged USDC',
  UsdcLogo
);

const USDC_ARBITRUM = new Token(
  arbitrum.id,
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  6,
  'USDC',
  'USD Coin',
  UsdcLogo
);

const USDT_ARBITRUM = new Token(
  arbitrum.id,
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  6,
  'USDT',
  'Tether USD',
  UsdtLogo
);

const WBTC_ARBITRUM = new Token(
  arbitrum.id,
  '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
  8,
  'WBTC',
  'Wrapped Bitcoin',
  WbtcLogo
);

const WETH_ARBITRUM = new Token(
  arbitrum.id,
  '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const ARB_ARBITRUM = new Token(
  arbitrum.id,
  '0x912ce59144191c1204e64559fe8253a0e49e6548',
  18,
  'ARB',
  'Arbitrum',
  ArbLogo
);

const UNI_ARBITRUM = new Token(
  arbitrum.id,
  '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
  18,
  'UNI',
  'Uniswap',
  UniLogo
);

const WSTETH_ARBITRUM = new Token(
  arbitrum.id,
  '0x5979d7b546e38e414f7e9822514be443a4800529',
  18,
  'wstETH',
  'Wrapped liquid staked Ether 2.0',
  WstEthLogo
);

const WETH_BASE = new Token(
  base.id,
  '0x4200000000000000000000000000000000000006',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const USDBC_BASE = new Token(
  base.id,
  '0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca',
  6,
  'USDbC',
  'USD Base Coin',
  UsdbcLogo
);

const CBETH_BASE = new Token(
  base.id,
  '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22',
  18,
  'cbETH',
  'Coinbase Wrapped Staked ETH',
  CbEthLogo
);

const BASED_BASE = new Token(
  base.id,
  '0xba5e6fa2f33f3955f0cef50c63dcc84861eab663',
  18,
  'BASED',
  'based.markets',
  BasedLogo
);

const NOUNS_BASE = new Token(base.id, '0x0a93a7BE7e7e426fC046e204C44d6b03A302b631', 18, 'NOUNS', 'nouns', NounsLogo);
const NUTS_BASE = new Token(base.id, '0x39030fae8909cff20bf101fc3c18d2bebba2bfa7', 18, 'NUTS', 'nutcracker', NutsLogo);

const DEEZ_BASE = new Token(base.id, '0x0c9d9daa3d79899b0a8f57ea35285c041e86a78f', 18, 'DEEZ', 'december', DeezLogo);

const USDC_LINEA = new Token(linea.id, '0x176211869ca2b568f2a7d4ee941e073a821ee1ff', 6, 'USDC', 'USD Coin', UsdcLogo);

const WETH_LINEA = new Token(
  linea.id,
  '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const WBTC_LINEA = new Token(
  linea.id,
  '0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4',
  8,
  'WBTC',
  'Wrapped Bitcoin',
  WbtcLogo
);

const USDT_LINEA = new Token(linea.id, '0xa219439258ca9da29e9cc4ce5596924745e12b93', 6, 'USDT', 'Tether USD', UsdtLogo);

const USDC_SCROLL = new Token(scroll.id, '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4', 6, 'USDC', 'USD Coin', UsdcLogo);

const WETH_SCROLL = new Token(
  scroll.id,
  '0x5300000000000000000000000000000000000004',
  18,
  'WETH',
  'Wrapped Ether',
  WethLogo
);

const USDT_SCROLL = new Token(
  scroll.id,
  '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
  6,
  'USDT',
  'Tether USD',
  UsdtLogo
);

const WBTC_SCROLL = new Token(
  scroll.id,
  '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1',
  8,
  'WBTC',
  'Wrapped Bitcoin',
  WbtcLogo
);

const DEGEN_BASE = new Token(base.id, '0x4ed4e862860bed51a9570b96d89af5e1b0efefed', 18, 'DEGEN', 'Degen', DegenLogo);

const TOSHI_BASE = new Token(base.id, '0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4', 18, 'TOSHI', 'Toshi', ToshiLogo);

const BRETT_BASE = new Token(base.id, '0x532f27101965dd16442e59d40670faf5ebb142e4', 18, 'BRETT', 'Brett', BrettLogo);

const BALD_BASE = new Token(base.id, '0x27d2decb4bfc9c76f0309b8e88dec3a601fe25a8', 18, 'BALD', 'Bald', BaldLogo);

const TOKEN_DATA: { [chainId: number]: { [address: Address]: Token } } = {
  [mainnet.id]: {
    [USDC_MAINNET.address.toLowerCase()]: USDC_MAINNET,
    [WBTC_MAINNET.address.toLowerCase()]: WBTC_MAINNET,
    [WETH_MAINNET.address.toLowerCase()]: WETH_MAINNET,
    [WSTETH_MAINNET.address.toLowerCase()]: WSTETH_MAINNET,
    [CVX_MAINNET.address.toLowerCase()]: CVX_MAINNET,
    [BADGER_MAINNET.address.toLowerCase()]: BADGER_MAINNET,
    [MKR_MAINNET.address.toLowerCase()]: MKR_MAINNET,
    [UNI_MAINNET.address.toLowerCase()]: UNI_MAINNET,
    [APE_MAINNET.address.toLowerCase()]: APE_MAINNET,
    [RPL_MAINNET.address.toLowerCase()]: RPL_MAINNET,
    [MATIC_MAINNET.address.toLowerCase()]: MATIC_MAINNET,
    [LDO_MAINNET.address.toLowerCase()]: LDO_MAINNET,
    [ENA_MAINNET.address.toLowerCase()]: ENA_MAINNET,
  },
  [optimism.id]: {
    [BRIDGED_USDC_OPTIMISM.address.toLowerCase()]: BRIDGED_USDC_OPTIMISM,
    [DAI_OPTIMISM.address.toLowerCase()]: DAI_OPTIMISM,
    [FRAX_OPTIMISM.address.toLowerCase()]: FRAX_OPTIMISM,
    [LYRA_OPTIMISM.address.toLowerCase()]: LYRA_OPTIMISM,
    [OP_OPTIMISM.address.toLowerCase()]: OP_OPTIMISM,
    [PERP_OPTIMISM.address.toLowerCase()]: PERP_OPTIMISM,
    [POOLTOGETHER_OPTIMISM.address.toLowerCase()]: POOLTOGETHER_OPTIMISM,
    [SNX_OPTIMISM.address.toLowerCase()]: SNX_OPTIMISM,
    [UNI_OPTIMISM.address.toLowerCase()]: UNI_OPTIMISM,
    [USDC_OPTIMISM.address.toLowerCase()]: USDC_OPTIMISM,
    [USDT_OPTIMISM.address.toLowerCase()]: USDT_OPTIMISM,
    [VELO_OPTIMISM.address.toLowerCase()]: VELO_OPTIMISM,
    [WBTC_OPTIMISM.address.toLowerCase()]: WBTC_OPTIMISM,
    [WETH_OPTIMISM.address.toLowerCase()]: WETH_OPTIMISM,
    [WSTETH_OPTIMISM.address.toLowerCase()]: WSTETH_OPTIMISM,
  },
  [arbitrum.id]: {
    [ARB_ARBITRUM.address.toLowerCase()]: ARB_ARBITRUM,
    [DAI_ARBITRUM.address.toLowerCase()]: DAI_ARBITRUM,
    [GMX_ARBITRUM.address.toLowerCase()]: GMX_ARBITRUM,
    [MAGIC_ARBITRUM.address.toLowerCase()]: MAGIC_ARBITRUM,
    [MAGIC_INTERNET_MONEY_ARBITRUM.address.toLowerCase()]: MAGIC_INTERNET_MONEY_ARBITRUM,
    [USDC_ARBITRUM.address.toLowerCase()]: USDC_ARBITRUM,
    [BRIDGED_USDC_ARBITRUM.address.toLowerCase()]: BRIDGED_USDC_ARBITRUM,
    [USDT_ARBITRUM.address.toLowerCase()]: USDT_ARBITRUM,
    [WBTC_ARBITRUM.address.toLowerCase()]: WBTC_ARBITRUM,
    [WETH_ARBITRUM.address.toLowerCase()]: WETH_ARBITRUM,
    [UNI_ARBITRUM.address.toLowerCase()]: UNI_ARBITRUM,
    [WSTETH_ARBITRUM.address.toLowerCase()]: WSTETH_ARBITRUM,
  },
  [base.id]: {
    [WETH_BASE.address.toLowerCase()]: WETH_BASE,
    [CBETH_BASE.address.toLowerCase()]: CBETH_BASE,
    [BALD_BASE.address.toLowerCase()]: BALD_BASE,
    [BASED_BASE.address.toLowerCase()]: BASED_BASE,
    [USDBC_BASE.address.toLowerCase()]: USDBC_BASE,
    [DEGEN_BASE.address.toLowerCase()]: DEGEN_BASE,
    [TOSHI_BASE.address.toLowerCase()]: TOSHI_BASE,
    [DEEZ_BASE.address.toLowerCase()]: DEEZ_BASE,
    [NUTS_BASE.address.toLowerCase()]: NUTS_BASE,
    [NOUNS_BASE.address.toLowerCase()]: NOUNS_BASE,
    [BRETT_BASE.address.toLowerCase()]: BRETT_BASE,
  },
  [linea.id]: {
    [USDC_LINEA.address.toLowerCase()]: USDC_LINEA,
    [WETH_LINEA.address.toLowerCase()]: WETH_LINEA,
    [WBTC_LINEA.address.toLowerCase()]: WBTC_LINEA,
    [USDT_LINEA.address.toLowerCase()]: USDT_LINEA,
  },
  [scroll.id]: {
    [USDC_SCROLL.address.toLowerCase()]: USDC_SCROLL,
    [WETH_SCROLL.address.toLowerCase()]: WETH_SCROLL,
    [USDT_SCROLL.address.toLowerCase()]: USDT_SCROLL,
    [WBTC_SCROLL.address.toLowerCase()]: WBTC_SCROLL,
  },
};

export function getTokens(chainId: number): Token[] {
  return Array.from(Object.values(TOKEN_DATA[chainId]));
}

export function getToken(chainId: number, address: Address): Token | undefined {
  return TOKEN_DATA[chainId][getLowercaseAddress(address)];
}

export function getTokenBySymbol(chainId: number, symbol: string): Token | undefined {
  return Object.values(TOKEN_DATA[chainId]).find((token) => token.symbol.toLowerCase() === symbol.toLowerCase());
}

function getLowercaseAddress(address: Address): Address {
  return address.toLowerCase() as Address;
}
