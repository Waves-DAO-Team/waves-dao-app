export const environment = {
  production: true,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    rest: 'https://nodes-testnet.wavesnodes.com',
    contractAddress: '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5'
  },

  // Routing constants on page
  routing: {
    listing: '',
    entity: 'entity/:entityId',
    application: 'entity/:entityId/application',
    about: 'about',
    setting: 'settings',
    create: 'create',
    stylesheet: 'stylesheet'
  }
}
