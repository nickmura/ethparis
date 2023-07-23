export const ssr = false;
import fs from 'fs';
import * as Name from 'w3name'
import { BigNumber } from "ethers";

import { writable } from "svelte/store";
import '$lib/globalState'

export const balanceOnBlock = writable<BigNumber>(BigNumber.from(0)); 

export const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ4YWY4QWJBOTJhYTU1OWQzOUEwMDUyNDg0QTRFMDI5MmI3ZTZEZWYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg3Njc5OTU5NDgsIm5hbWUiOiJmdW5kci1nIn0.rgCHsG_iqdul_rTYAA1ZCofl1KsUQBveLL_Jmtd8PYk'


export const currentNamePointer = writable<string>()
export async function writeSigningKey(name,) {
    const bytes = name.key.bytes;
    await fs.promises.writeFile('ipns_key.txt', bytes)
}
export async function loadSigningKey(filename) {
    const bytes = await fs.promises.readFile(filename);
    const name = await Name.from(bytes);
    return name;
  }