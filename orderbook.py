import asyncio
from typing import NewType
from cowdao_cowpy.order_book.api import OrderBookApi, UID
from cowdao_cowpy.common.chains import Chain
from cowdao_cowpy.order_book.generated.model import (
    UID,
    OrderCreation,
    OrderQuoteRequest,
    OrderQuoteResponse,
    OrderQuoteSide1,
    OrderQuoteSideKindSell,
    TokenAmount,
)
from cowdao_cowpy.common.config import SupportedChainId
from cowdao_cowpy.cow.swap import swap_tokens
from web3 import Web3,AsyncWeb3,contract
from constants import celoRpc,cusdAddress,sepoliaRPC,daiAddress
from eth_typing.evm import ChecksumAddress
from abi import erc20_abi
from swap import get_contract
from account import get_user_Balance
#provider = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(sepoliaRPC))

we3 = Web3(Web3.HTTPProvider(sepoliaRPC))
#localAccount = we3.eth.account.from_key(key)
# Define custom types
HexStr = NewType("HexStr", str)
HexAddress = NewType("HexAddress", HexStr)
ChecksumAddress = NewType("ChecksumAddress", HexAddress)

def to_checksum_address(address: str) -> ChecksumAddress:
    """Convert a string Ethereum address to a properly formatted ChecksumAddress."""
    if not Web3.is_address(address):
        raise ValueError(f"Invalid Ethereum address: {address}")
    return ChecksumAddress(HexAddress(HexStr(Web3.to_checksum_address(address))))


# Initialize the OrderBookApi
order_book_api = OrderBookApi()

from web3 import Web3

async def approveTx(amount,private_key,tokenAddress):
    VAULT_RELAYER = "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110"
    
    # Initialize web3 (Make sure this is already defined somewhere in your code)
   

    # Get contract and signer
    contract, signer = get_contract(tokenAddress=tokenAddress,private_key=private_key)

    # Get nonce for the account
    nonce = we3.eth.get_transaction_count(signer.address, "pending")

    # Build transaction
    tx = contract.functions.approve(VAULT_RELAYER, amount).build_transaction({
        'from': signer.address,
        'gas': 200000,  
        'gasPrice': we3.eth.gas_price,
        'nonce': nonce,
    })

    # Sign the transaction
    signed_tx = we3.eth.account.sign_transaction(tx, private_key)

    # Send the transaction
    tx_hash = we3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f"Transaction sent! Waiting for confirmation... TxHash: {we3.to_hex(tx_hash)}")

    # Wait for the transaction to be mined
    receipt = we3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Transaction mined! Block number: {receipt.blockNumber}")

    return dict((receipt))

async def fetch_orders():
    uid = "0xff2e2e54d178997f173266817c1e9ed6fee1a1aae4b43971c53b543cffcc2969845c6f5599fbb25dbdd1b9b013daf85c03f3c63763e4bc4a"
    print(uid)  # Replace with actual order UID
    orders = await order_book_api.get_order_by_uid(uid)  # Await the async call
    print(orders)




# // Get quote
#       const { quote } = await orderBookApi.getQuote(quoteRequest)
async def get_quote():
      quote_request = {
    "sellToken": '0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1',
    "buyToken": '0x9c58bacc331c9aa871afd802db6379a98e80cedb',
    "from": "0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4",
    "receiver": "0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4",
    "sellAmountBeforeFee": str(int(0.4 * 10 ** 18)),  
    "kind": OrderQuoteSideKindSell.sell,  
}
      quote = await order_book_api.post_quote(quote_request,side=OrderQuoteSide1)
      
      print(quote)
      return quote

# Run the async function
#asyncio.run(get_quote())

async def SwapTokens(private_key,amountt,sell_token,buy_token):
      localAccount = we3.eth.account.from_key(private_key)
      #amountt = Web3.to_wei(4, 'ether')
      print("The amount in wei is",amountt)
      print("Approving .....")
      #check user balance to see it more than the sell token
      user_bal = get_user_Balance(user_Address=localAccount.address,tokenAddress=to_checksum_address(sell_token))
      #if user bal is less than the amountt don't continue with the rest of the code
      if user_bal < amountt:
           print("You don't have enough tokens to swap")
           return           
      receipt = await approveTx(amount=amountt,private_key=private_key,tokenAddress=sell_token)
      swaptx = await swap_tokens(amount=str(amountt),account=localAccount,chain=Chain.SEPOLIA,sell_token=to_checksum_address(sell_token),buy_token=to_checksum_address(buy_token))  #0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14   ,DAI 0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D
      print(swaptx)
      return receipt,swaptx
#asyncio.run(SwapTokens())