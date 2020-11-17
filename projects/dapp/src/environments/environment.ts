
export const environment = {
  production: false,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    // contractAddress: '3MvqnYLwBErxGtKzeEjgWgr2RXgniokicR2'
    contractAddress: '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5'
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
    stylesheet: 'stylesheet'
  }
}
