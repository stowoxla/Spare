//8.3-mam-fetch-private
const Mam = require('@iota/mam')
const Converter = require('@iota/converter')

const provider = 'https://nodes.devnet.iota.org:443'

const root = 'KKELORDPGCHGJNBBMFMJRVROBRVUAKRKJBRAUEFCPNEXMJKGTUPHJX9LWEVBFROYGFMVYBMAYTCSEBYLJ'
//Let's initialize the Mam object now
const mode = 'private'

//const sideKey = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'

let state = Mam.init(provider)
//let state = Mam.init(provider)
if (mode == 'private') {
    Mam.changeMode(state, 'private')
} else if (mode == 'restricted') {
    Mam.changeMode(state, 'restricted', sideKey)
}
//async function receiveMessage(nextRoot) {
//  const resp = await Mam.fetch(mode, sidekey,'restricted')
//    resp.messages.map(message => logger(message))}
//With Mam.fetch(root) we read the message stream. Mam.fetch() returns a response object which,
//among other things, returns the messages found under the key 'messages'. With
//resp.messages.map(message => logger(message))
async function receiveMessage(nextRoot) {
    let resp;

    // fetch messages according to mode
    if (mode != 'restricted') {
        resp = await Mam.fetch(nextRoot, mode)
    } else {
        resp = await Mam.fetch(nextRoot, mode, sideKey)
    }
    // log messages
    resp.messages.map(message => logger(message))
}
