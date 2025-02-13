import erc20 from "@/abi/erc20.json";
import { RPC } from "@/rpc/rpc";
import { ethers } from "ethers";

type RpcConfig = Record<string, { name: string; rpc: string }>;

const GetProvider = (Chain: keyof typeof RPC): ethers.JsonRpcProvider => {
    const rpcUrl = (RPC as RpcConfig)[Chain]?.rpc;
    if (!rpcUrl) throw new Error(`Invalid ChainId or missing RPC URL for ${Chain}`);
    
    return new ethers.JsonRpcProvider(rpcUrl);
};

// Create contract instance
const create_contract = async (
    chainId: keyof typeof RPC, 
    tokenAddress: string
): Promise<ethers.Contract> => {
    const provider = GetProvider(chainId);
    return new ethers.Contract(tokenAddress, erc20, provider);
};
const format_ether = (amount:string)=>{
    return ethers.formatUnits(amount, 'ether');
}
// Get user token balance
const get_Token_User_Balance = async (
    chainId: keyof typeof RPC, 
    tokenAddress: string, 
    user_address: string
): Promise<number> => {
    const contract = await create_contract(chainId, tokenAddress); 
    const balance = await contract.balanceOf(user_address);
    const token_decimal = await contract.decimals() 
    return Number(ethers.formatUnits(balance, token_decimal)); 
};

export {  get_Token_User_Balance,format_ether };
