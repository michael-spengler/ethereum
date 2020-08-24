
import * as log from "https://deno.land/std/log/mod.ts";
import { Request } from 'https://deno.land/x/request@1.1.0/request.ts'
import { fromAddress, toAddress, amountToBeSent, privateKey, proxyBaseURL } from "./.env.ts";

async function transfer(fromAddress: string, toAddress: string, amountToBeSent: number, privateKey: string) {
    const url = `${proxyBaseURL}/transfer?fromAddress=${fromAddress}&toAddress=${toAddress}&amoutToBeSent=${amountToBeSent}&privateKey=${privateKey}`
    const response = await Request.get(url)

    log.info(response.result)
}

await transfer(fromAddress, toAddress, amountToBeSent, privateKey)
