export const ssr = false;

import { BigNumber } from "ethers";

import { writable } from "svelte/store";
import '$lib/globalState';

export const balanceOnBlock = writable<BigNumber>(BigNumber.from(0)); 

export const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ4YWY4QWJBOTJhYTU1OWQzOUEwMDUyNDg0QTRFMDI5MmI3ZTZEZWYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg3Njc5OTU5NDgsIm5hbWUiOiJmdW5kci1nIn0.rgCHsG_iqdul_rTYAA1ZCofl1KsUQBveLL_Jmtd8PYk'