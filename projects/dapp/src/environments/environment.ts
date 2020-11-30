
export const environment = {
  production: false,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    // contractAddress: '3MvqnYLwBErxGtKzeEjgWgr2RXgniokicR2'
    // contractAddress: '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5'
    // contractAddress: '3MtDV965HUsLhFcW1wA36qX5tNSa52nfnq5'
    contractAddress: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
    contracts: {
      disruptive: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
      dev: '3MtV1AQ8fEPk76tjKgvrufuMe5aA3q4TviQ',
      interhack: '3N2sQRGTRmL9NGZVVtzhfBEjEyVR7S9Mkum'
    }
  },

  // Routing constants on page
  routing: {
    listing: '',
    entity: 'entity/:entityId',
    application: 'entity/:entityId/application',
    about: 'about',
    applyGrant: 'apply-grant/:entityId',
    createGrant: 'create-grant',
    editGrant: 'edit-grant/:entityId',
    masterSetting: 'master-setting',
    setting: 'settings',
    create: 'create',
    members: 'members',
    stylesheet: 'stylesheet',
    team: 'team/:entityId'
  },

  showDevTools: false
}
