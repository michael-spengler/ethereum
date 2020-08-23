import { fail, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { EtherscanAPI } from "./etherscan-api.ts";

Deno.test("getEtherBalanceForASingleAddress", async (): Promise<void> => {

    const response = await EtherscanAPI.getEtherBalanceForASingleAddress('0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a', 'thisIsAnInvalidToken')

    assertEquals('Invalid API Key', response.result)

});

