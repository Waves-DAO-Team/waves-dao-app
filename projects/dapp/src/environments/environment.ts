
export const environment = {
  production: false,
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
      membership: '3MwRzi2BmqZZXWrCGCwcRQLsnic2Aod6zhS'
    },
    contracts: {
      disruptive: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
      web3: '3MtV1AQ8fEPk76tjKgvrufuMe5aA3q4TviQ',
      interhack: '3MutoJzdTrUrDBhCu1qU6FRgAADLadZEL9D'
    },
    issues: {
      disruptive: 'https://github.com/Waves-Association/grants-program/blob/main/README.md',
      web3: 'https://github.com/Waves-Association/grants-program/blob/main/README.md',
      interhack: 'https://github.com/Waves-Association/grants-program/blob/main/README.md'
    }
  },

  workingGroup: {
    '3MtsjR7qZQLRKfpkYHybo65f2p6GydDvn5X': {
      name: 'Sam I Am',
      twitter: 'Link'
    },
    '3MwRzi2BmqZZXWrCGCwcRQLsnic2Aod6zhS': {
      name: 'Bohdan Stun',
      twitter: 'Link'
    },
    '3N9eoi55zj9AzeDT415pMEm8dyeHiuz1wST': {
      name: 'John Smith',
      linkedin: 'Link'
    },
    '3N6XZgaswUMmihcHkUTXfBGAxekdkP541yT': {
      name: 'Gregory Volandemort',
      facebook: 'Link'
    }
  },

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
