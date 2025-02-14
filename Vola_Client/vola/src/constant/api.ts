import { VolaAgentURL } from "./url";

//Send a Post  request

export async function addTransaction(
  private_key: string,
  amount: number,
  buy_token: string,
  sell_token: string,
  duration: number,
  percentage: number
): Promise<any> {
  try {
    const response = await fetch("/api/add_transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        private_key,
        amount,
        buy_token,
        sell_token,
        duration,
        percentage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error adding transaction:", error);
    throw new Error(error.message || "Something went wrong");
  }
}

  
  

//get /get_latest_prediction
export interface PredictionData {
    predicted_price: number;
    token_pair: string;
    user_balance_TokenA: number;
    user_balance_TokenB: number;
    sell_token:string;
    buy_token:string;
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

            export const fetchBalance = async (
              chainId: string,
              tokenAddress: string,
              userAddress: string
            ) => {
              try {
                const url = `/api/get_token_balance?chainId=${chainId}&tokenAddress=${tokenAddress}&userAddress=${userAddress}`;
                console.log(`Fetching balance for chainId: ${chainId}, token: ${tokenAddress}, user: ${userAddress}`);
            
                const response = await fetch(url, {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                });
            
                if (!response.ok) {
                  throw new Error(`Failed to fetch balance: ${response.statusText}`);
                }
            
                const data = await response.json();
                console.log("User Balance:", data);
                return data.balance;
              } catch (error) {
                console.error("Error fetching balance:", error);
                return null; // Return null or handle the error accordingly
              }
            };
            
            
          