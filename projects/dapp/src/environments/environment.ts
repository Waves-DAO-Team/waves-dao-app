
export const environment = {
  production: false,
  confirmations: 0,
  grantsProgramLink: 'https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+',

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    explorer: 'https://testnet.wavesexplorer.com/address/',
    contractAddress: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
    contracts: {
      disruptive: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
      web3: '3MtV1AQ8fEPk76tjKgvrufuMe5aA3q4TviQ',
      interhack: '3MutoJzdTrUrDBhCu1qU6FRgAADLadZEL9D'
    }
  },

  // Routing constants on page
  routing: {
    home: '',
    listing: 'contract/:contractType',
    about: 'contract/:contractType/about',
    entity: 'contract/:contractType/:entityId',
    createGrant: 'contract/:contractType/create-grant',
    masterSetting: 'contract/:contractType/settings',
    members: 'members',
    stylesheet: 'stylesheet',
    addReward: 'contract/:contractType/add-reward/:entityId'
  },

  showDevTools: false
}
