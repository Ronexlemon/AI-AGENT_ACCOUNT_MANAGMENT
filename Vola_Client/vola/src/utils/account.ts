import { ethers } from "ethers";

const getPublicKey =(private_key:string):string=>{
    const wallet = new ethers.Wallet(private_key)
    return wallet.address
}

export {getPublicKey}