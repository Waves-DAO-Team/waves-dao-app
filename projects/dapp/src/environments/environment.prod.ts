
export const environment = {
  production: true,
  confirmations: 0,
  grantsProgramLink: '${GRANT_PROGRAM_LINK}',
  about: {
    disruptive: '${DISRUPTIVE_ABOUT_LINK}',
    votings: '${VOTINGS_ABOUT_LINK}',
    web3: '${WEB3_ABOUT_LINK}',
    interhack: '${INTERHACK_ABOUT_LINK}'
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
      membership: '${MEMBERSHIP}'
    },
    contracts: {
      disruptive: {
        address: '${DISRUPTIVE}',
        rewardAsset: '${DISRUPTIVE_REWARD_ASSET}' || 'WAVES',
        rewardAssetIcon: '${DISRUPTIVE_REWARD_ASSET_ICON}' || null
      },
      votings: {
        address: '${VOTINGS}',
        rewardAsset: null,
        rewardAssetIcon: null
      },
      web3: {
        address: '${WEB3}' || '',
        rewardAsset: '${WEB3_REWARD_ASSET}' || 'WAVES',
        rewardAssetIcon: '${WEB3_REWARD_ASSET_ICON}' || null
      },
      interhack: {
        address: '${INTERHACK}',
        rewardAsset: '${INTERHACK_REWARD_ASSET}' || 'WAVES',
        rewardAssetIcon: '${INTERHACK_REWARD_ASSET_ICON}' || null
      },
    },
    issues: {
      disruptive: '${DISRUPTIVE_ISSUE_TEMPLATE}',
      votings: '${VOTINGS_ISSUE_TEMPLATE}',
      web3: '${WEB3_ISSUE_TEMPLATE}',
      interhack: '${INTERHACK_ISSUE_TEMPLATE}'
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
      }
    },
    emails: {
      grants: 'grants@wavesassociation.org'
    }
  },

  /* eslint-disable */
  workingGroup: JSON.parse('${WORKING_GROUP}' || '{}'),
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
    addReward: 'grants/:contractType/add-reward/:entityId'
  },

  showDevTools: false,
  gtag: '${TAG_MANAGER}'
}
