import {  assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EtherscanAPI } from "./etherscan-api.ts";
import { apiKey } from "./.env.ts";
import { Converter } from "./converter.ts";


Deno.test("getEtherBalanceForASingleAddress", async (): Promise<void> => {

    const response = await EtherscanAPI.getEtherBalanceForASingleAddress('0x0c20E28e38fB60dB58FeF931ff94aC459F34458f', apiKey, false)

    assertEquals('Invalid API Key', response.result) // because we are testing with an invalid api key

});

Deno.test("getGasFees", async (): Promise<void> => {

    const response = await EtherscanAPI.getGasFees(apiKey)

    assertEquals('Invalid API Key', response.result) // because we are testing with an invalid api key

});

Deno.test("currentPrice", async (): Promise<void> => {

    const response = await EtherscanAPI.currentPrice(apiKey)

    assertEquals('Invalid API Key', response.result) // because we are testing with an invalid api key

});

Deno.test("convert Ether To Finney", async (): Promise<void> => {

    assertEquals(Converter.convertEtherToFinney(1), 1000)

});
