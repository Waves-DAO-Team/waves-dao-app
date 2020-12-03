
export const environment = {
  production: false,
  confirmations: 1,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    contractAddress: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
    contracts: {
      disruptive: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
      dev: '3MtV1AQ8fEPk76tjKgvrufuMe5aA3q4TviQ',
      interhack: '3MutoJzdTrUrDBhCu1qU6FRgAADLadZEL9D'
    }
  },

  // Routing constants on page
  routing: {
    home: '',
    listing: '',
    entity: 'entity/:entityId',
    application: 'entity/:entityId/application',
    about: 'about',
    applyGrant: 'apply-grant/:entityId',
    createGrant: 'create-grant',
    editGrant: 'edit-grant/:entityId',
    masterSetting: 'settings',
    create: 'create',
    members: 'members',
    stylesheet: 'stylesheet',
    team: 'team/:entityId'
  },

  showDevTools: false
}
