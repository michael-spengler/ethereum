
// https://ethereum.stackexchange.com/questions/42929/send-payment-from-wallet-using-web3
// https://web3js.readthedocs.io/en/v1.2.7/web3-utils.html#tohex


const fs = require('fs-sync')
const path = require('path')
const express = require('express')
const axios = require('axios')
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const http = require('http')
const https = require('https')
const cors = require('cors')

const configFileId = path.join(path.resolve(''), './transfer-proxy-server/.env.json')
const config = fs.readJSON(configFileId)

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${config.infuraProjectId}`));

executeMasterplan()
    .then((result) => {
        console.log('masterplan works')
    })
    .catch((error) => console.log(error.message))

async function executeMasterplan() {
    const app = express();
    app.use(cors())
    defineRoutes(app)
    startListening(app)
}

function defineRoutes(app) {

    app.get('/transfer', async (req, res) => {
        await transfer(req.query.fromAddress, req.query.toAddress, Number(req.query.amoutToBeSent), req.query.privateKey, 4)
        res.send({ result: "transferred successfully" })
    })

}

function startListening(app) {
    if (config.httpsPort > 0) {
        const certificate = fs.read(config.pathToCert)
        const privateCertKey = fs.read(config.pathToCertKey)
        const credentials = { key: privateCertKey, cert: certificate }
        const httpsServer = https.createServer(credentials, app)
        httpsServer.listen(config.httpsPort)
        console.log(`listening on : https://danceplanner.org`)
    }

    if (config.httpPort > 0) {
        const httpServer = http.createServer(app)
        httpServer.listen(config.httpPort)
        console.log(`listening on : http://localhost:${config.httpPort}`)
    }
}


function transfer(fromAddress, toAddress, amountToSend, privateKey, chainId = 4) {

    console.log(`preparing transaction with \n${fromAddress} \n${toAddress} \n${amountToSend} \n${privateKey} \n${chainId}`)

    const gasPrice = 2;
    const gasLimit = 3000000;

    const EthereumTx = require('ethereumjs-tx').Transaction
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')

    var nonce = web3.eth.getTransactionCount(fromAddress);

    const rawTransaction = {
        "from": fromAddress,
        "nonce": web3.utils.toHex(nonce),
        "gasPrice": web3.utils.toHex(gasPrice * 1e9),
        "gasLimit": web3.utils.toHex(gasLimit),
        "to": toAddress,
        "value": amountToSend,
        "chainId": chainId //remember to change this
    };

    const tx = new EthereumTx(rawTransaction, { chain: 'mainnet', hardfork: 'petersburg' })
    tx.sign(privateKeyBuffer)

    const serializedTx = tx.serialize()

    console.log(`this is getting serious :)`)

    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
      if (!err) {
        console.log('Txn Sent and hash is ' + hash);
      }
      else {
        console.error(err);
      }
    });
}