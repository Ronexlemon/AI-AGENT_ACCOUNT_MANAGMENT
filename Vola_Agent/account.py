from swap import get_contract,we3


def get_user_Balance(user_Address,tokenAddress):
    contract = get_contract(tokenAddress=tokenAddress)
    user_balance_wei = contract.functions.balanceOf(user_Address).call()
    token_decimals = contract.functions.decimals().call()
    
    # Convert balance using the token decimals
    user_balance = user_balance_wei / (10 ** token_decimals)
    return user_balance

def get_user_address(private_key):
    return we3.eth.account.from_key(private_key).address

#print(get_user_Balance(user_Address="0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4",tokenAddress="0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D"))