# 💰 FinNova App Backend

Welcome to the backend repository for the **Finanzas App**. This is a robust RESTful API built with **Node.js** and **Express**, designed to manage financial planning simulations, client data, and complex payment structures. It uses **PostgreSQL** as the relational database, managed via **Sequelize ORM**.

## 🚀 Features

-   **User Authentication**: Secure registration and login system.
-   **Client Management**: Handle client profiles and socioeconomic data.
-   **Financial Entities**: Manage institutions (e.g., Universities, Banks).
-   **Payment Plans (Plan de Pagos)**: Create and track payment schedules with associated quotas.
-   **Financial Indicators**: Tracking of key financial metrics.
-   **Cost Management**: Manage initial and periodic costs associated with locals/properties.
-   **Catalog Management**: System catalogs and reference data.

## 🛠️ Tech Stack

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Sequelize](https://sequelize.org/)
-   **Authentication**: JSON Web Tokens (JWT) & bcrypt (implied)
-   **Language**: JavaScript (ES Modules)

## 🧮 Financial Algorithms

The backend core implements rigorous financial logic for payment plan simulations. Below are the main algorithms detailed:

### 1. Rate Conversion
To ensure precision, all rates (Nominal or Effective) are standardized before calculations:
-   **Nominal Rate to EAR (Effective Annual Rate)**: Uses the formula `(1 + TN/m)^n - 1`.
-   **EAR to EPR (Effective Period Rate)**: Adjusts the annual rate to the chosen payment frequency (monthly, quarterly, etc.) using `(1 + EAR)^(1/n) - 1`.

### 2. French Method (Constant Quota)
The quota calculation follows the French amortization system, characterized by:
-   **Fixed Quota**: A constant base quota is calculated including capital and interest.
-   **Formula**: `Quota = P * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]`
    -   Where `P` is the balance, `i` is the EPR, and `n` is the number of remaining quotas.
-   **Composition**: In each period, the interest portion decreases and the capital portion increases.

### 3. Grace Period Management
The system supports and validates complex grace periods:
-   **No Grace**: Quota payment (capital + interest) starts from the first period.
-   **Partial Grace**: The client pays only the generated interest. Capital is not amortized.
-   **Total Grace**: No payments are made. Generated interest is capitalized, increasing the debt balance for subsequent periods.

### 4. Profitability Indicators
For each simulation, a Cash Flow is generated to calculate:
-   **NPV (Net Present Value)**: Brings future flows to present value to evaluate viability.
-   **IRR (Internal Rate of Return)**: The rate that makes NPV zero.
-   **TCEA (Annual Effective Cost Rate)**: Calculated from the IRR of the collection flow, representing the real credit cost for the client, including insurance and additional charges.

### 5. Additional Costs
The algorithm integrates operating costs into each quota:
-   **Credit Life Insurance (Desgravamen)**: Percentage applied to the outstanding balance.
-   **All-Risk Insurance**: Fixed or variable amount depending on the property value.
-   **Administrative Expenses and Postage**: Fixed monthly charges.

## 📂 Project Structure

```bash
src/
├── config/         # Database and environment configuration
├── controllers/    # API Request handlers
├── middlewares/    # Custom middlewares (Auth, Validation)
├── models/         # Sequelize database models
├── routes/         # API Routes definitions
└── services/       # Business logic (Optional/If implemented)
index.js            # Entry point of the application
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   **Node.js** (v18+ recommended)
-   **PostgreSQL** installed and running locally or a cloud instance.
-   **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/jlinares30/finanzas-server.git
    cd backend-finanzas
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You can use the following template:

    ```ini
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_NAME=finanzas_db
    # Add any other specific secrets here (e.g., JWT_SECRET)
    ```

4.  **Database Setup**
    Ensure your PostgreSQL database (`DB_NAME`) is created. The application uses Sequelize `sync({ alter: true })` on startup, which will automatically create/update the tables based on the models.

### Running the Server

-   **Development Mode** (if nodemon is available, otherwise use start)
    ```bash
    npm start
    ```

-   The server will start on `http://localhost:3000` (or your defined PORT).

## 📡 API Endpoints Overview

| Method | Endpoint             | Description                                      |
| :----- | :------------------- | :----------------------------------------------- |
| `use`  | `/api/auth`          | Authentication (Login, Register)                 |
| `use`  | `/api/catalogo`      | Manage system catalogs                           |
| `use`  | `/api/cliente`       | Client profile operations                        |
| `use`  | `/api/entidad`       | Financial Entity operations                      |
| `use`  | `/api/indicador`     | Financial Indicators management                  |
| `use`  | `/api/plan-pagos`    | Payment plans and quotas                         |

---
*Developed by Jorge Linares.*
