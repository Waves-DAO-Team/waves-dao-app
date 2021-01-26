export const environment = {
  production: true,
  confirmations: 0,
  grantsProgramLink: 'https://github.com/Waves-Association/grants-program/issues' +
      '/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--' +
      'interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+',

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    explorer: 'https://testnet.wavesexplorer.com/address/',
    management: {
      membership: '3NCGXdprrsBp9rzrGna68MmfJXQ7fcinF7o'
    },
    contracts: {
      disruptive: '3N71MDc3kPD6cnbdWp6iEuDY8ghgZ9DiVan',
      web3: '3N6QtvE15KN8rsW1jkBe1kz8xJHdmhNsYnG',
      interhack: '3N2sQRGTRmL9NGZVVtzhfBEjEyVR7S9Mkum'
    },
    issues: {
      disruptive: 'https://github.com/vlzhr/grants-program/issues/new?assignees=' +
          'KardanovIR&labels=Disruptive+Tech+Grant&template=track-1--disruptive-' +
          'tech-grant.md&title=%5BTrack+1.+Disruptive+Tech+Grant%5D+',
      web3: 'https://github.com/vlzhr/grants-program/issues/new?assignees=' +
          'KardanovIR&labels=Web3.0+Development+Grant&template=track-2--web3-' +
          '0-development-grant.md&title=%5BTrack+2.+Web3.0+Development+Grant%5D+',
      interhack: 'https://github.com/vlzhr/grants-program/issues/new?assignees=' +
          'KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.' +
          'md&title=%5BTrack+3.+Interhack+Grant%5D+'
    }
  },

  /* eslint-disable */
  workingGroup: JSON.parse('' || '{}'),
  /* eslint-enable */

  // Routing constants on page
  routing: {
    home: '',
    listing: 'grants/:contractType',
    about: 'grants/:contractType/about',
    entity: 'grants/:contractType/:entityId',
    createGrant: 'grants/:contractType/create-grant',
    members: 'members',
    stylesheet: 'stylesheet',
    addReward: 'grants/:contractType/add-reward/:entityId'
  },

  showDevTools: false
}
