import {
  parseBoolean,
  parseJson,
  parseNumber,
  parseValue,
} from './utils'

export const environment = {
  production: parseBoolean('${PRODUCTION}', false),
  confirmations: 0,
  grantsProgramLink: parseValue('${GRANT_PROGRAM_LINK}', ''),
  about: {
    disruptive: parseValue('${DISRUPTIVE_ABOUT_LINK}', ''),
    votings: parseValue('${VOTINGS_ABOUT_LINK}', ''),
    web3: parseValue('${WEB3_ABOUT_LINK}', ''),
    interhack: parseValue('${INTERHACK_ABOUT_LINK}', ''),
  },
  apis: {
    testnet: {
      nodes: 'https://nodes-testnet.wavesnodes.com',
      signer: 'https://testnet.waves.exchange/signer/',
      rest: 'https://nodes-testnet.wavesnodes.com',
      explorer: 'https://testnet.wavesexplorer.com/address/',
    },
    mainnet: {
      nodes: 'https://nodes.wavesnodes.com',
      signer: 'https://waves.exchange/signer/',
      rest: 'https://nodes.wavesnodes.com',
      explorer: 'https://wavesexplorer.com/address/',
    },
    management: {
      membership: parseValue('${MEMBERSHIP}', ''),
    },
    contracts: {
      disruptive: {
        address: parseValue('${DISRUPTIVE}', ''),
        rewardAsset: parseValue('${DISRUPTIVE_REWARD_ASSET}', 'WAVES'),
        rewardAssetIcon: parseValue('${DISRUPTIVE_REWARD_ASSET_ICON}', '/assets/coins/waves.svg'),
        rewardDecimals: parseNumber('${DISRUPTIVE_REWARD_DECIMALS}', 2),
      },
      votings: {
        address: parseValue('${VOTINGS}', ''),
        rewardAsset: null,
        rewardAssetIcon: null,
        rewardDecimals: 0,
      },
      web3: {
        address: parseValue('${WEB3}', ''),
        rewardAsset: parseValue('${WEB3_REWARD_ASSET}', 'WAVES'),
        rewardAssetIcon: parseValue('${WEB3_REWARD_ASSET_ICON}', '/assets/coins/waves.svg'),
        rewardDecimals: parseNumber('${WEB3_REWARD_DECIMALS}', 2),
      },
      interhack: {
        address: parseValue('${INTERHACK}', ''),
        rewardAsset: parseValue('${INTERHACK_REWARD_ASSET}', 'WAVES'),
        rewardAssetIcon: parseValue('${INTERHACK_REWARD_ASSET_ICON}', '/assets/coins/waves.svg'),
        rewardDecimals: parseNumber('${INTERHACK_REWARD_DECIMALS}', 2),
      },
    },
    issues: {
      disruptive: parseValue('${DISRUPTIVE_ISSUE_TEMPLATE}', ''),
      votings: parseValue('${VOTINGS_ISSUE_TEMPLATE}', ''),
      web3: parseValue('${WEB3_ISSUE_TEMPLATE}', ''),
      interhack: parseValue('${INTERHACK_ISSUE_TEMPLATE}', ''),
    },
    links: {
      telegram: 'https://t.me/WavesDAO',
      facebook: 'https://www.facebook.com/wavesassociation',
      medium: 'https://medium.com/waves-association',
      twitter: 'https://twitter.com/Waves_Assn',
      github: {
        api: 'https://api.github.com/repos',
        raw: 'https://raw.githubusercontent.com/',
        mdEnd: '/contents/README.md',
      },
    },
    emails: {
      grants: 'grants@wavesassociation.org',
    },
  },

  /* eslint-disable */
  workingGroup: parseJson('${WORKING_GROUP}'),
  /* eslint-enable */

  // Routing constants on page
  routing: {
    landing: '',
    guide: 'guide',
    listing: 'grants/:contractType',
    community: 'community/:contractType',
    about: 'grants/:contractType/about',
    entity: 'grants/:contractType/:entityId',
    createGrant: 'grants/:contractType/create-grant',
    allTeams: 'grants/:contractType/:entityId/all-teams',
    members: 'members',
    stylesheet: 'stylesheet',
    addReward: 'grants/:contractType/add-reward/:entityId',
  },

  showDevTools: false,
  gtag: parseValue('${TAG_MANAGER}', ''),
}

