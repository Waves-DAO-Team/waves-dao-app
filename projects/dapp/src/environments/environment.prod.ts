export const environment = {
  production: true,
  confirmations: 0,
  grantsProgramLink: '${GRANT_PROGRAM_LINK}',

  apis: {
    nodes: 'https://nodes.wavesnodes.com',
    signer: 'https://waves.exchange/signer/',
    rest: 'https://nodes.wavesnodes.com',
    explorer: 'https://wavesexplorer.com/address/',

    // USE SYSTEM ENVIRONMENTS ON BUILD PROJECT
    management: {
      membership: '${MEMBERSHIP}'
    },
    contracts: {
      disruptive: '${DISRUPTIVE}',
      web3: '${WEB3}',
      interhack: '${INTERHACK}'
    },

    issues: {
      disruptive: '${DISRUPTIVE_ISSUE_TEMPLATE}',
      web3: '${WEB3_ISSUE_TEMPLATE}',
      interhack: '${INTERHACK_ISSUE_TEMPLATE}'
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
    about: 'grants/:contractType/about',
    entity: 'grants/:contractType/:entityId',
    createGrant: 'grants/:contractType/create-grant',
    allTeams: 'grants/:contractType/:entityId/all-teams',
    members: 'members',
    stylesheet: 'stylesheet',
    addReward: 'grants/:contractType/add-reward/:entityId'
  },

  showDevTools: false
}
