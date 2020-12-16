
export const environment = {
  production: false,
  confirmations: 1,
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
    },
    issues: {
      disruptive: 'https://github.com/vlzhr/grants-program/issues/new?assignees=KardanovIR&labels=Disruptive+Tech+Grant&template=track-1--disruptive-tech-grant.md&title=%5BTrack+1.+Disruptive+Tech+Grant%5D+',
      web3: 'https://github.com/vlzhr/grants-program/issues/new?assignees=KardanovIR&labels=Web3.0+Development+Grant&template=track-2--web3-0-development-grant.md&title=%5BTrack+2.+Web3.0+Development+Grant%5D+',
      interhack: 'https://github.com/vlzhr/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+'
    }
  },

  // Routing constants on page
  routing: {
    home: '',
    listing: 'grants/:contractType',
    about: 'grants/:contractType/about',
    entity: 'grants/:contractType/:entityId',
    createGrant: 'grants/:contractType/create-grant',
    masterSetting: 'grants/:contractType/settings',
    members: 'members',
    stylesheet: 'stylesheet',
    addReward: 'grants/:contractType/add-reward/:entityId'
  },

  showDevTools: false
}
