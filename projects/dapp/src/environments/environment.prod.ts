export const environment = {
  production: true,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    // contractAddress: '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5'
    // contractAddress: '3MtDV965HUsLhFcW1wA36qX5tNSa52nfnq5'
    contractAddress: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
    contracts: [
      '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
      '3MtDV965HUsLhFcW1wA36qX5tNSa52nfnq5',
      '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5'
    ]
  },

  // Routing constants on page
  routing: {
    listing: '',
    entity: 'entity/:entityId',
    application: 'entity/:entityId/application',
    about: 'about',
    applyGrant: 'apply-grant/:entityId',
    createGrant: 'create-grant',
    setting: 'settings',
    create: 'create',
    members: 'members',
    stylesheet: 'stylesheet',
    editGrant: 'edit-grant/:entityId',
    masterSetting: 'master-setting',
    team: 'team/:entityId'
  },

  showDevTools: false
}
