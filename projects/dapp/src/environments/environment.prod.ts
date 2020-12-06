export const environment = {
  production: true,
  confirmations: 1,
  grantsProgramLink: 'https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+',

  apis: {
    nodes: 'https://nodes.wavesnodes.com',
    signer: 'https://waves.exchange/signer/',
    rest: 'https://nodes.wavesnodes.com',
    contractAddress: '3PBZs1dzpMoQwCZM1KNwxxQZVnmRU6wqC2e',
    contracts: {
      disruptive: '3PLAhMnipQdjzasGeh5B2EKxKP74dasHHqD',
      web3: '3PB8KDpFJqiDbqhmu8crSmU8h7krxFt68Pd',
      interhack: '3PBZs1dzpMoQwCZM1KNwxxQZVnmRU6wqC2e'
    }
  },

  // Routing constants on page
  routing: {
    home: '',
    listing: 'contract/:contractType',
    about: 'contract/:contractType/about',
    entity: 'contract/:contractType/:entityId',
    createGrant: 'create-grant',
    members: 'members',
    stylesheet: 'stylesheet',
    editGrant: 'edit-grant/:entityId',
    masterSetting: 'settings',
    addReward: 'add-reward/:entityId'
  },

  showDevTools: false
}
