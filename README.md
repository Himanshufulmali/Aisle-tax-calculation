# Product Tax Calculator API

This is a simple web API built with Node.js to calculate taxes on products. It adds sales tax and import duty where needed.

---

## How to Run It

1.  **Get the code:**
    ```bash
    git clone https://github.com/Himanshufulmali/Aisle-tax-calculation
    ```

2.  **Install:**
    ```bash
    npm install
    ```

3.  **Setup Taxes (in a `.env` file):**
    Create a file named **`.env`** in the main folder and add ( I have added .env as well as .env.sample, you should avoid .env while pushing the code.)

4.  **Start the API:**
    ```bash
    npm start
    ```
    You'll see a message like `Server started on port : 8000` (or your port).

---

## How to Use It (API Endpoints)

The API is at `http://localhost:8000` (use your port).

### 1. Check if it's alive:

* **GET** `/api/v1/tax-calculation`
* **Returns:** `{"message": "Welcome To Product Tax Calculation"}`

### 2. Calculate a Bill:

* **POST** `/api/v1/tax-calculation`
* **Send this (JSON Body):**
    ```json
    {
        "products": [
            { 
                "category": "music", 
                "name": "CD", 
                "price": 14.99, 
                "quantity": 1,
                "isImported": false 
                },
            { 
                "category": "perfume", 
                "name": "Creed", 
                "price": 47.50, 
                "quantity": 1, 
                "isImported": true }
        ]
    }
    ```
    *( Each product needs: `category`, `name`, `price` (number), `quantity` (number), `isImported` (true/false) )*

* **You'll get back (Success):**
    ```json
    [
        "1 CD: 16.49",
        "1 imported Perfume: 54.65",
        "Sales taxes: 7.65",
        "Total: 71.14"
    ]
    ```
* **You'll get back (Error if input is wrong):**
    ```json
    { "error": "Please check the input fileds" }
    ```

---

## Running Tests

To run the automated tests:

```bash
npm test