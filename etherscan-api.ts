import * as log from "https://deno.land/std/log/mod.ts";
import { Request } from 'https://deno.land/x/request@1.3.0/mod.ts'

export class EtherscanAPI {

    private static baseURL = 'https://api.etherscan.io/'

    public static async getEtherBalanceForASingleAddress(address: string, apiKey: string, inEther: boolean) {
        const endPoint = `/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
        const result = await Request.get(`${this.baseURL}${endPoint}`)
        if(inEther==true){
            result.result = result.result/1000000000000000000  // api response is in unit wei --> change it to ether
        }
        log.info(JSON.stringify(result))
        return result
    }

    public static async getHistEtherBalanceForASingleAddressByBlockNo(address: string, blockNo: string, apiKey: string) {
        const endPoint = `/api?module=account&action=balancehistory&address=${address}&blockno=${blockNo}&apikey=${apiKey}`
        const result = await Request.get(`${this.baseURL}${endPoint}`)

        log.info(JSON.stringify(result))
        return result
    }

    public static async getEtherBalanceForMultipleAddresses(addressesCommaSeparated: string, apiKey: string) {
        const endPoint = `/api?module=account&action=balancemulti&address=${addressesCommaSeparated}&tag=latest&apikey=${apiKey}`
        const result = await Request.get(`${this.baseURL}${endPoint}`)

        log.info(JSON.stringify(result))
        return result
    }
    public static async getGasFees(apiKey: string) {
        const endPoint = `/api?module=gastracker&action=gasoracle&apikey=${apiKey}` 
        const result = await Request.get(`${this.baseURL}${endPoint}`)
        
        log.info(JSON.stringify(result))
        return result
    }
    public static async currentPrice(apiKey: string) {
        const endPoint = `/api?module=stats&action=ethprice&apikey=${apiKey}` 
        const result = await Request.get(`${this.baseURL}${endPoint}`)
        
        log.info(JSON.stringify(result))
        return result
    }
}

    // to be done...

// // Separate addresses by comma, up to a maxium of 20 accounts in a single batch
// // Get a list of 'Normal' Transactions By Address
// // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results
// const endPoint = `/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`

// // (Returned 'isError' values: 0=No Error, 1=Got Error)

// // (Returns up to a maximum of the last 10000 transactions only)

// // Or

// const endPoint = `/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`

// // (To get paginated results use page=<page number> and offset=<max records to return>)
// // Get a list of 'Internal' Transactions by Address
// // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results

// const endPoint = `/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=2702578&sort=asc&apikey=YourApiKeyToken`

// // (Returned 'isError' values: 0=No Error, 1=Got Error)

// // (Returns up to a maximum of the last 10000 transactions only)

// // Or

// const endPoint = `/api?module=account&action=txlistinternal&address=0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`

// // (To get paginated results use page=<page number> and offset=<max records to return>)
// // Get "Internal Transactions" by Transaction Hash
// const endPoint = `/api?module=account&action=txlistinternal&txhash=0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170&apikey=YourApiKeyToken`

// // (Returned 'isError' values: 0=Ok, 1=Rejected/Cancelled)

// // (Returns up to a maximum of the last 10000 transactions only)
// // Get "Internal Transactions" by Block Range
// const endPoint = `/api?module=account&action=txlistinternal&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`

// // (Returns up to a maximum of the last 10000 transactions only)
// // Get a list of "ERC20 - Token Transfer Events" by Address
// // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results

// const endPoint = `/api?module=account&action=tokentx&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`

// // (Returns up to a maximum of the last 10000 transactions only)

// // Or

// const endPoint = `/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&page=1&offset=100&sort=asc&apikey=YourApiKeyToken`

// // (To get paginated results use page=<page number> and offset=<max records to return>)

// // Or

// const endPoint = `/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=100&sort=asc&apikey=YourApiKeyToken`

// // (To get transfer events for a specific token contract, include the contractaddress parameter)
// // Get a list of "ERC721 - Token Transfer Events" by Address
// // [Optional Parameters] startblock: starting blockNo to retrieve results, endblock: ending blockNo to retrieve results

// const endPoint = `/api?module=account&action=tokennfttx&address=0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`

// // (Returns up to a maximum of the last 10000 transactions only)

// // Or

// const endPoint = `/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&page=1&offset=100&sort=asc&apikey=YourApiKeyToken`

// // (To get paginated results use page=<page number> and offset=<max records to return>)

// // Or

// const endPoint = `/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&address=0x6975be450864c02b4613023c2152ee0743572325&page=1&offset=100&sort=asc&apikey=YourApiKeyToken`

// // (To get transfer events for a specific token contract, include the contractaddress parameter)
// // Get list of Blocks Mined by Address
// const endPoint = `/api?module=account&action=getminedblocks&address=0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b&blocktype=blocks&apikey=YourApiKeyToken`

// // Or

// const endPoint = `/api?module=account&action=getminedblocks&address=0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b&blocktype=blocks&page=1&offset=10&apikey=YourApiKeyToken`

// (To get paginated results use page=<page number> and offset=<max records to return>)

// // ** type = blocks (full blocks only) or uncles (uncle blocks only)
// // Contract APIs
// // Get Contract ABI for Verified Contract Source Codes
// const endPoint = `/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken`

// // A simple sample for retrieving the contractABI using Web3.js and Jquery to interact with a contract

// //     var Web3 = require('web3');
// //     var web3 = new Web3(new Web3.providers.HttpProvider());
// //     var version = web3.version.api;

// //     $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
// //         var contractABI = "";
// //         contractABI = JSON.parse(data.result);
// //         if (contractABI != ''){
// //             var MyContract = web3.eth.contract(contractABI);
// //             var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
// //             var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
// //             console.log("result1 : " + result);            
// //             var result = myContractInstance.members(1);
// //             console.log("result2 : " + result);
// //         } else {
// //             console.log("Error" );
// //         }            
// //     });
// // Get Contract Source Code for Verified Contract Source Codes
// //     1. /api?module=contract&action=getsourcecode&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=YourApiKeyToken (replace the address parameter with the actual contract address)

// //     2. You can also download a CSV list of Verified contract addresses of which the code publishers have provided a corresponding Open Source license for re-distribution

// //     3. Terms of usage: Please see the usage terms policy
// // Verify Source Code (beta)
// //     1. Requires a valid Etherscan APIkey, will reject if otherwise

// //     2. Current daily limit of 100 submissions per day per user (subject to change)

// //     3. Only supports HTTP post due to max transfer size limitations for http get

// //     4. Supports up to 10 different library pairs

// //     5. Contracts that use "imports" will need to have the code concatenated into one file as we do not support "imports" in separate files. You can try using the Blockcat solidity-flattener or SolidityFlattery

// //     6. List of supported solc versions, only solc version v0.4.11 and above is supported. Ex. v0.4.25+commit.59dbf8f1

// //     7. Upon successful submission you will receive a GUID (50 characters) as a receipt.

// //     8. You may use this GUID to track the status of your submission

// //     9. Verified Source Codes will be displayed at contractsVerified

// // See Demo Source Verification Submission Code at Source Code Verification Sample 

// // Source Code Submission Gist (returns a guid as part of the result upon success):

// //     //Submit Source Code for Verification
// //     $.ajax({
// //         type: "POST",                       //Only POST supported  
// //         url: "/api", //Set to the  correct API url for Other Networks
// //         data: {
// //             apikey: $('#apikey').val(),                     //A valid API-Key is required        
// //             module: 'contract',                             //Do not change
// //             action: 'verifysourcecode',                     //Do not change
// //             contractaddress: $('#contractaddress').val(),   //Contract Address starts with 0x...     
// //             sourceCode: $('#sourceCode').val(),             //Contract Source Code (Flattened if necessary)
// //             codeformat: $('#codeformat').val(),             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
// //             contractname: $('#contractname').val(),         //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
// //             compilerversion: $('#compilerversion').val(),   // see http://etherscan.io/solcversions for list of support versions
// //             optimizationUsed: $('#optimizationUsed').val(), //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
// //             runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
// //             constructorArguements: $('#constructorArguements').val(),   //if applicable
// //             evmversion: $('#evmVersion').val(),             //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
// //             licenseType: $('#licenseType').val(),           //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://etherscan.io/contract-license-types
// //             libraryname1: $('#libraryname1').val(),         //if applicable, a matching pair with libraryaddress1 required
// //             libraryaddress1: $('#libraryaddress1').val(),   //if applicable, a matching pair with libraryname1 required
// //             libraryname2: $('#libraryname2').val(),         //if applicable, matching pair required
// //             libraryaddress2: $('#libraryaddress2').val(),   //if applicable, matching pair required
// //             libraryname3: $('#libraryname3').val(),         //if applicable, matching pair required
// //             libraryaddress3: $('#libraryaddress3').val(),   //if applicable, matching pair required
// //             libraryname4: $('#libraryname4').val(),         //if applicable, matching pair required
// //             libraryaddress4: $('#libraryaddress4').val(),   //if applicable, matching pair required
// //             libraryname5: $('#libraryname5').val(),         //if applicable, matching pair required
// //             libraryaddress5: $('#libraryaddress5').val(),   //if applicable, matching pair required
// //             libraryname6: $('#libraryname6').val(),         //if applicable, matching pair required
// //             libraryaddress6: $('#libraryaddress6').val(),   //if applicable, matching pair required
// //             libraryname7: $('#libraryname7').val(),         //if applicable, matching pair required
// //             libraryaddress7: $('#libraryaddress7').val(),   //if applicable, matching pair required
// //             libraryname8: $('#libraryname8').val(),         //if applicable, matching pair required
// //             libraryaddress8: $('#libraryaddress8').val(),   //if applicable, matching pair required
// //             libraryname9: $('#libraryname9').val(),         //if applicable, matching pair required
// //             libraryaddress9: $('#libraryaddress9').val(),   //if applicable, matching pair required
// //             libraryname10: $('#libraryname10').val(),       //if applicable, matching pair required
// //             libraryaddress10: $('#libraryaddress10').val()  //if applicable, matching pair required
// //         },
// //         success: function (result) {
// //             console.log(result);
// //             if (result.status == "1") {
// //                 //1 = submission success, use the guid returned (result.result) to check the status of your submission.
// //                 // Average time of processing is 30-60 seconds
// //                 document.getElementById("postresult").innerHTML = result.status + ";" + result.message + ";" + result.result;
// //                 // result.result is the GUID receipt for the submission, you can use this guid for checking the verification status
// //             } else {
// //                 //0 = error
// //                 document.getElementById("postresult").innerHTML = result.status + ";" + result.message + ";" + result.result;
// //             }
// //             console.log("status : " + result.status);
// //             console.log("result : " + result.result);
// //         },
// //         error: function (result) {
// //             console.log("error!");
// //             document.getElementById("postresult").innerHTML = "Unexpected Error"
// //         }
// //     });
// // Check Source code verification submission status:
// //     //Check Source Code Verification Status
// //     $.ajax({
// //         type: "GET",
// //         url: "/api",
// //         data: {
// //             guid: 'ezq878u486pzijkvvmerl6a9mzwhv6sefgvqi5tkwceejc7tvn', //Replace with your Source Code GUID receipt above
// //             module: "contract",
// //             action: "checkverifystatus"
// //         },
// //         success: function (result) {
// //             console.log("status : " + result.status);   //0=Error, 1=Pass 
// //             console.log("message : " + result.message); //OK, NOTOK
// //             console.log("result : " + result.result);   //result explanation
// //             $('#guidstatus').html(">> " + result.result);
// //         },
// //         error: function (result) {
// //             alert('error');
// //         }
// //     });
// // Transaction APIs
// // Check Contract Execution Status (if there was an error during contract execution)
// // Note: isError":"0" = Pass ,  isError":"1" = Error during Contract Execution

// const endPoint = `/api?module=transaction&action=getstatus&txhash=0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a&apikey=YourApiKeyToken`
// // Check Transaction Receipt Status (Only applicable for Post Byzantium fork transactions)
// // Note: status: 0 = Fail, 1 = Pass. Will return null/empty value for pre-byzantium fork

// const endPoint = `/api?module=transaction&action=gettxreceiptstatus&txhash=0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76&apikey=YourApiKeyToken`

// // Blocks APIs
// // Get Block And Uncle Rewards by BlockNo
// const endPoint = `/api?module=block&action=getblockreward&blockno=2165403&apikey=YourApiKeyToken`

// // Get Estimated Block Countdown Time by BlockNo
// const endPoint = `/api?module=block&action=getblockcountdown&blockno=9100000&apikey=YourApiKeyToken`

// // Get Block Number by Timestamp
// // [Parameters] timestamp format: Unix timestamp (supports Unix timestamps in seconds), closest value: 'before' or 'after'

// const endPoint = `/api?module=block&action=getblocknobytime&timestamp=1578638524&closest=before&apikey=YourApiKeyToken`
// // Event Logs
// // The Event Log API was designed to provide an alternative to the native eth_getLogs. Below are the list of supported filter parameters:

// //         . fromBlock, toBlock, address
// //         . topic0, topic1, topic2, topic3 (32 Bytes per topic)
// //         . topic0_1_opr (and|or between topic0 & topic1), topic1_2_opr (and|or between topic1 & topic2), topic2_3_opr (and|or between topic2 & topic3), topic0_2_opr (and|or between topic0 & topic2), topic0_3_opr (and|or between topic0 & topic3), topic1_3_opr (and|or between topic1 & topic3)

// //     - FromBlock & ToBlock accepts the blocknumber (integer, NOT hex) or 'latest' (earliest & pending is NOT supported yet)
// //     - Topic Operator (opr) choices are either 'and' or 'or' and are restricted to the above choices only
// //     - FromBlock & ToBlock parameters are required
// //     - An address and/or topic(X) parameters are required, when multiple topic(X) parameters are used the topicX_X_opr (and|or operator) is also required
// //     - For performance & security considerations, only the first 1000 results are return. So please narrow down the filter parameters

// // Here are some examples of how this filter maybe used:

// // Get Event Logs from block number 379224 to 'latest' Block, where log address = 0x33990122638b9132ca29c723bdf037f1a891a70c and topic[0] = 0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545

// // /api?module=logs&action=getLogs
// // &fromBlock=379224
// // &toBlock=latest
// // &address=0x33990122638b9132ca29c723bdf037f1a891a70c
// // &topic0=0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545
// // &apikey=YourApiKeyToken

// // Get Event Logs from block number 379224 to block 400000 , where log address = 0x33990122638b9132ca29c723bdf037f1a891a70c, topic[0] = 0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545 'AND' topic[1] = 0x72657075746174696f6e00000000000000000000000000000000000000000000

// // /api?module=logs&action=getLogs
// // &fromBlock=379224
// // &toBlock=400000
// // &address=0x33990122638b9132ca29c723bdf037f1a891a70c
// // &topic0=0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545
// // &topic0_1_opr=and
// // &topic1=0x72657075746174696f6e00000000000000000000000000000000000000000000
// // &apikey=YourApiKeyToken
// // Geth/Parity Proxy APIs
// // The following are the limited list of supported Proxied APIs for Geth available through Etherscan.

// // For the list of the parameters and descriptions please see https://github.com/ethereum/wiki/wiki/JSON-RPC. Parameters provided should be named like in the examples below. For compatibility with Parity, please prefix all hex strings with "0x"
// // eth_blockNumber
// // Returns the number of most recent block

// // /api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken
// // eth_getBlockByNumber
// // Returns information about a block by block number

// // /api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true&apikey=YourApiKeyToken
// // eth_getUncleByBlockNumberAndIndex
// // Returns information about a uncle by block number

// // /api?module=proxy&action=eth_getUncleByBlockNumberAndIndex&tag=0x210A9B&index=0x0&apikey=YourApiKeyToken
// // eth_getBlockTransactionCountByNumber
// // Returns the number of transactions in a block from a block matching the given block number

// // /api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=0x10FB78&apikey=YourApiKeyToken
// // eth_getTransactionByHash
// // Returns the information about a transaction requested by transaction hash

// // /api?module=proxy&action=eth_getTransactionByHash&txhash=0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1&apikey=YourApiKeyToken
// // eth_getTransactionByBlockNumberAndIndex
// // Returns information about a transaction by block number and transaction index position

// // /api?module=proxy&action=eth_getTransactionByBlockNumberAndIndex&tag=0x10d4f&index=0x0&apikey=YourApiKeyToken
// // eth_getTransactionCount
// // Returns the number of transactions sent from an address

// // /api?module=proxy&action=eth_getTransactionCount&address=0x2910543af39aba0cd09dbb2d50200b3e800a63d2&tag=latest&apikey=YourApiKeyToken
// // eth_sendRawTransaction
// // Creates new message call transaction or a contract creation for signed transactions

// // /api?module=proxy&action=eth_sendRawTransaction&hex=0xf904808000831cfde080&apikey=YourApiKeyToken

// // (Replace the hex value with your raw hex encoded transaction that you want to send.
// // Send as a POST request, if your hex code is particularly long)
// // eth_getTransactionReceipt
// // Returns the receipt of a transaction by transaction hash

// // /api?module=proxy&action=eth_getTransactionReceipt&txhash=0x1e2910a262b1008d0616a0beb24c1a491d78771baa54a33e66065e03b1f46bc1&apikey=YourApiKeyToken
// // eth_call
// // Executes a new message call immediately without creating a transaction on the block chain

// // /api?module=proxy&action=eth_call&to=0xAEEF46DB4855E25702F8237E8f403FddcaF931C0&data=0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724&tag=latest&apikey=YourApiKeyToken

// // (The gas parameter to eth_call are capped at 2x the current block gas limit)
// // eth_getCode
// // Returns code at a given address

// // /api?module=proxy&action=eth_getCode&address=0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c&tag=latest&apikey=YourApiKeyToken
// // eth_getStorageAt
// // Returns the value from a storage position at a given address

// // /api?module=proxy&action=eth_getStorageAt&address=0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd&position=0x0&tag=latest&apikey=YourApiKeyToken
// // eth_gasPrice
// // Returns the current price per gas in wei

// // /api?module=proxy&action=eth_gasPrice&apikey=YourApiKeyToken
// // eth_estimateGas
// // Makes a call or transaction, which won't be added to the blockchain and returns the used gas, which can be used for estimating the used gas

// // /api?module=proxy&action=eth_estimateGas&to=0xf0160428a8552ac9bb7e050d90eeade4ddd52843&value=0xff22&gasPrice=0x051da038cc&gas=0xffffff&apikey=YourApiKeyToken

// // (The gas parameter to eth_estimateGas are capped at 2x the current block gas limit)
// // Token Info APIs
// // Get ERC20-Token TotalSupply by ContractAddress
// // /api?module=stats&action=tokensupply&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&apikey=YourApiKeyToken
// // Get Historical ERC20-Token TotalSupply by ContractAddress & BlockNo
// // /api?module=stats&action=tokensupplyhistory&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&blockno=8000000&apikey=YourApiKeyToken
// // Get ERC20-Token Account Balance for TokenContractAddress
// // /api?module=account&action=tokenbalance&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&tag=latest&apikey=YourApiKeyToken
// // Get Historical ERC20-Token Account Balance for TokenContractAddress by BlockNo
// // /api?module=account&action=tokenbalancehistory&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055&address=0xe04f27eb70e025b78871a2ad7eabe85e61212761&blockno=8000000&apikey=YourApiKeyToken
// // Get Token Info by ContractAddress
// // /api?module=token&action=tokeninfo&contractaddress=0x0e3a2a1f2146d86a604adc220b4967a898d7fe07&apikey=YourApiKeyToken
// // Gas Tracker APIs
// // Get Estimation of Confirmation Time
// // /api?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=YourApiKeyToken

// // (Result returned in seconds, gasprice value in Wei)
// // Get Gas Oracle
// // /api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken
// // General Stats APIs
// // Get Total Supply of Ether
// // /api?module=stats&action=ethsupply&apikey=YourApiKeyToken

// // (Result returned in Wei, to get value in Ether divide resultAbove/1000000000000000000)
// // Get ETHER Last Price
// // /api?module=stats&action=ethprice&apikey=YourApiKeyToken
// // Get Ethereum Nodes Size
// // [Parameters] startdate and enddate format 'yyyy-MM-dd', clienttype value is 'geth' or 'parity', syncmode value is 'default' or 'archive'

// // /api?module=stats&action=chainsize&startdate=2019-02-01&enddate=2019-02-28&clienttype=geth&syncmode=default&sort=asc&apikey=YourApiKeyToken

// // (The chainsize return in bytes.)
// // Get ETHER Historical Price
// // [Parameters] startdate and enddate format 'yyyy-MM-dd'

// // /api?module=stats&action=ethdailyprice&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get ETHER Historical Daily Market Cap
// // /api?module=stats&action=ethdailymarketcap&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Transaction Count
// // /api?module=stats&action=dailytx&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily New Address Count
// // /api?module=stats&action=dailynewaddress&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Block Size
// // /api?module=stats&action=dailyavgblocksize&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Block Time for A Block to be Included in the Ethereum Blockchain
// // /api?module=stats&action=dailyavgblocktime&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Gas Price Used
// // /api?module=stats&action=dailyavggasprice&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Gas Limit
// // /api?module=stats&action=dailyavggaslimit&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Total Gas Used
// // /api?module=stats&action=dailygasused&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Block Rewards
// // /api?module=stats&action=dailyblockrewards&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Block Count and Block Rewards
// // /api?module=stats&action=dailyblkcount&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Uncle Block Count and Uncle Block Rewards
// // /api?module=stats&action=dailyuncleblkcount&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Network Hash Rate
// // /api?module=stats&action=dailyavghashrate&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Average Network Difficulty
// // /api?module=stats&action=dailyavgnetdifficulty&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Total Transaction Fee
// // /api?module=stats&action=dailytxnfee&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily Network Utilization
// // /api?module=stats&action=dailynetutilization&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // Get Daily ENS Registration Count
// // /api?module=stats&action=dailyensregister&startdate=2019-02-01&enddate=2019-02-28&sort=asc&apikey=YourApiKeyToken
// // }