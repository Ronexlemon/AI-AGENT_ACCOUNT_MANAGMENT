import { VolaAgentURL } from "./url";

//Send a Post  request

export async function addTransaction(private_key: string,amount: number,buy_token: string,sell_token: string,duration: number): Promise<any> {
        const url = VolaAgentURL + "/add_transaction";
        const data = {
            "private_key": private_key,
            "amount": amount,
            "buy_token": buy_token,
            "sell_token": sell_token,
            "duration": duration
            };
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.error("Error:", error));
                    }


