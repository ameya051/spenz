# Finance Platform

Welcome to my Finance Platform project! This platform is designed to help you manage your personal or business finances effectively. With this Finance SaaS Platform, you can track your income and expenses, categorize transactions, assign them to specific accounts, and import transactions using a CSV file. Additionally, it integrates with Plaid to connect to your bank account and uses Lemon Squeezy for monetization.

## Features

- **Track Income and Expenses:** Monitor your financial transactions with ease.
- **Categorize Transactions:** Organize your transactions by categories for better clarity.
- **Account Management:** Assign transactions to specific accounts.
- **CSV Import:** Import transactions from CSV files for quick data entry.

## Tech Stack

- **Frontend:** Next.js, React
- **Backend:** Hono.js
- **Database:** PostgreSQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ameya051/spenz.git
   cd spenz
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
   NEXT_PUBLIC_APP_URL=
   CLERK_SECRET_KEY=
   CLERK_PUBLISHABLE_KEY=
   ```

4. **Run the application:**

   ```bash
   pnpm dev
   ```

## Usage

1. **Track Income and Expenses:**

   - Add your income and expense transactions manually or import them from a CSV file.

2. **Categorize Transactions:**

   - Assign categories to your transactions for better organization.

3. **Account Management:**

   - Create and manage different accounts, assigning transactions to the appropriate accounts.

4. **CSV Import:**

   - Import transactions using a CSV file by navigating to the import section and uploading your file.

