# Vola Agent

Vola Agent is an AI-powered trading bot that monitors volatile token prices and automatically swaps to stablecoins to mitigate risks.

## 📌 Installation Guide

### 🚀 Setting Up the Backend (Vola_Agent)

1. **Navigate to the Backend Directory**  
   ```bash
   cd Vola_Agent

2. **Create a Virtual Environment**
  ```bash
  python3 -m venv venv
3. **Activate the Virtual Environment**
   ```bash
   source venv/bin/activate
 i.  **On macOS/Linux:**
     ```bash
source venv/bin/activate

  ii. **On Windows:**
      ```bash
venv\Scripts\activate

4. **Install Dependencies**
   ```bash
pip install -r requirements.txt

5.  **Run the Application**
      ```bash
python3 app.py

### 🎨 Setting Up the Frontend (Vola_client/vola)

1. **Navigate to the Frontend Directory**
    ```bash
cd Vola_client/vola
2. **Install Dependencies**
  ```bash
yarn install

3.  **Run the Application**
      ```bash
      yarn dev

### Your frontend should now be accessible at: http://localhost:3000

### ⚡ Additional Notes

 Ensure Python 3.x and Yarn are installed before proceeding.

If you encounter issues with dependencies, try updating pip:

pip install --upgrade pip

If the backend is running on a different machine, update the API URL in the frontend accordingly.

🎉 Enjoy using Vola Agent! 🚀