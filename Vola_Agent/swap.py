from web3 import Web3,AsyncWeb3,contract
from constants import celoRpc,cusdAddress,daiAddress,sepoliaRPC
from abi import erc20_abi
provider = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(sepoliaRPC))
we3 = Web3(Web3.HTTPProvider(sepoliaRPC))

def get_Signer(private_key):
  return we3.eth.account.from_key(private_key)


def get_contract(tokenAddress,private_key=None):
    """Returns a contract instance with a signer if private_key is provided."""
    contract = we3.eth.contract(address=provider.to_checksum_address(tokenAddress), abi=erc20_abi)
    
    if private_key:
        signer = get_Signer(private_key)
        provider.eth.default_account = signer.address  # Set default account
        return contract, signer

    return contract

async def  getBlock():
  return  we3.eth.get_block_number()



def getTokenName(tokenAddress):
   contract = get_contract(tokenAddress=tokenAddress)
   return contract.functions.symbol().call()



def transferToken(userAddress,private_key):
   contract,signer = get_contract(private_key=private_key)
   amount = 1
   nonce = we3.eth.get_transaction_count(signer.address, "pending")#we3.eth.get_transaction_count(signer.address)
   tx = contract.functions.transfer(userAddress,amount).build_transaction({
      'from': signer.address,
        'gas': 200000,  
        'gasPrice': we3.eth.gas_price,
        'nonce': nonce,
        })
   # Sign the transaction
   signed_tx = we3.eth.account.sign_transaction(tx, private_key)

    # Send the transaction
   tx_hash = we3.eth.send_raw_transaction(signed_tx.raw_transaction)
   print(f"Transaction sent! Waiting for confirmation... TxHash: {we3.to_hex(tx_hash)}")

    # **Wait for transaction to be mined**
   receipt = we3.eth.wait_for_transaction_receipt(tx_hash)
    
   print(f"Transaction confirmed in block: {receipt['blockNumber']}")

    

   return we3.to_hex(tx_hash),receipt  # Return transaction hash
      

