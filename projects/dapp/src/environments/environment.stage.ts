export const environment = {
  production: true,
  confirmations: 0,
  grantsProgramLink: 'https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+',

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    contractAddress: '3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA',
    contracts: {
      disruptive: '3N71MDc3kPD6cnbdWp6iEuDY8ghgZ9DiVan',
      web3: '3N6QtvE15KN8rsW1jkBe1kz8xJHdmhNsYnG',
      interhack: '3N2sQRGTRmL9NGZVVtzhfBEjEyVR7S9Mkum'
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
