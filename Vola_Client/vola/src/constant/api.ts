import { VolaAgentURL } from "./url";

//Send a Post  request

export async function addTransaction(private_key: string,amount: number,buy_token: string,sell_token: string,duration: number,percentage:number): Promise<any> {
        const url = VolaAgentURL + "/add_transaction";
        const data = {
            "private_key": private_key,
            "amount": amount,
            "buy_token": buy_token,
            "sell_token": sell_token,
            "duration": duration,
            "percentage": percentage
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


//get /get_latest_prediction
export interface PredictionData {
    predicted_price: number;
    token_pair: string;
    user_balance_TokenA: number;
    user_balance_TokenB: number;
  }
  
  export interface ApiResponse {
    data: PredictionData;
  }
export async function getLatestPrediction(): Promise<ApiResponse> {
    
    const response = await fetch("/api/get_predictions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            
              return await response.json();
            }