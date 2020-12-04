export const environment = {
  production: true,
  confirmations: 1,
  grantsProgramLink: "https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+",

  apis: {
    nodes: 'https://nodes.wavesnodes.com',
    signer: 'https://waves.exchange/signer/',
    rest: 'https://nodes.wavesnodes.com',
    contractAddress: '3PBZs1dzpMoQwCZM1KNwxxQZVnmRU6wqC2e',
    contracts: {
      disruptive: '3PLAhMnipQdjzasGeh5B2EKxKP74dasHHqD',
      dev: '3PB8KDpFJqiDbqhmu8crSmU8h7krxFt68Pd',
      interhack: '3PBZs1dzpMoQwCZM1KNwxxQZVnmRU6wqC2e'
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
    create: 'create',
    members: 'members',
    stylesheet: 'stylesheet',
    editGrant: 'edit-grant/:entityId',
    masterSetting: 'settings',
    team: 'team/:entityId',
    addReward: 'add-reward/:entityId'
  },

  showDevTools: false
}
