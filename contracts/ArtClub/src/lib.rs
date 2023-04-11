#![no_std]
use soroban_sdk::{ Address, contractimpl, symbol, vec, Env, Symbol, Vec};

pub struct  CrowdFunding {
        address: owner,
        title: String,
        description:String ,
        target:i32,
        deadline:i32,
        amountCollected: i32,
        image :i32,
        donators:Address[],
        donations:i32[],
}

#[contractimpl]
impl CrowdFunding {
    pub fn ArtProject(){

    }
}

