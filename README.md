# Wallet Wizard Finance Tracker

## Overview

Wallet Wizard Finance Tracker is a full-stack personal finance tracker for organizing transactions into user-defined categories. The application is built around a relational data model that links each transaction to a category, making it easier to review spending patterns in a clear, table-based interface. A Next.js frontend renders the data in responsive lists and forms, while an Express.js API used PostgreSQL to handle category and transaction CRUD operations.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, JavaScript, Express.js
- Database: PostgreSQL

## Features Built

- View transactions and categories in tables that make it easy to scan and compare previous transaction
- Create new categories and transactions through dedicated form pages
- Link each transaction to a specific category using a select input, helping keep spending organized and easier to track
- Open individual transaction and category pages to review existing information and make updates as needed
- Delete categories and transactions directly from the list views for quick record management without needing to navigate away from the main tables

## Challenges Faced 

- Adding an inline delete button to all rows in the category and transaction table, while maintaining the hover effect only on the information (i.e., name, amount, description, etc.)
- Implementing the add and update endpoints for category and transaction tables, specifically syncing the changes from the database into properly displaying on the user interface
- Transitioning from traditional CSS to Tailwind CSS slowed development initially because the utility-first approach required shifting away from the fine-grained, pixel-level control that traditional CSS provides

## Next Steps

- Implement JWT-based authentication to give each user a secure, private finance profile while keeping the auth flow aligned with the existing Express.js API structure
- Replaced inline delete buttons on each row with a single delete button that toggles a checklist selection mode, allowing users to select and remove multiple entries at once for a cleaner and more fluid UI
- Add a landing page to mimic a real-world web application, as well as provide key detail about the purpose of the application and why it is needed
- Add a widget that allows users to create a budget and allocate funds to different categories; each transaction will automatically calculate the new budget after a recent transaction from the category
- The application currently triggers a full page reload after deleting entries, which could be improved by implementing dynamic UI updates with state management for a smoother user experience
- Overhaul responsiveness of transaction and category tables to ensure tables resize appropriately, according to the user's screen size
- Update the database architecture to include a Users table for login and registration and add userID as a foreign key to the Category and Transaction tables to simplify retrieving user-specific data.

## Local Environment Setup Instructions

1. Install dependencies in both apps:

	```bash
 	cd client && npm install
	cd ../server && npm install
	```

2. Create `server/.env.development` with the following backend values:

	```env
	DATABASE_URL=your_postgres_connection_string
	DB_SSL=true
	```
3. Set the frontend API host and project title so the client can reach the backend and display the app name in the UI:

	This project's database is hosted on Supabase, but it can be created using any database hosting provider. Currently, the codebase does not support automatic syncronization of the tables within the database. The following database architecture schema can be used to create the tables necessary for the project (variable data types may be under different names in other database providers): 

	category table:
	- id (uuid and primary key)
	- name (text)
	- created_at (timestamp)
	- updated_at (timestamp)
	- deleted_at (timestamp)

	transaction table: 
	- id (uuid and primary key)
	- name (text)
	- category_id (foreign key from category table)
	- amount (numeric)
	- date (date)
	- description (text)
	- created_at (timestamp)
	- updated_at (timestamp)
	- deleted_at (timestamp)

	```env
	NEXT_PUBLIC_API_HOST=http://localhost:3100
	NEXT_PUBLIC_APP_TITLE=Wallet Wizard Project - February 2026 
	```

4. Start the backend:

   	```bash
	cd server
	npm run dev
   	```

5. Start the frontend in a separate terminal:

	```bash
	cd client
	npm run dev
	```