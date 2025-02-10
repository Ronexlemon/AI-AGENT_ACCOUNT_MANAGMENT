from swap import get_contract


def get_user_Balance(user_Address,tokenAddress):
    contract = get_contract(tokenAddress=tokenAddress)
    user_balance = contract.functions.balanceOf(user_Address).call()
    return user_balance

#print(get_user_Balance(user_Address="0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4",tokenAddress="0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D"))