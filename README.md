# Wallet Wizard Finance Tracker


## Overview

Wallet Wizard Finance Tracker is a full-stack personal finance tracker for organizing transactions into user-defined categories. The application is built around a relational data model that links each transaction to a category, making it easier to review spending patterns in a clear, table-based interface. A Next.js frontend renders the data in responsive lists and forms, while an Express.js API used PostgreSQL to handle category and transaction CRUD operations.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL

## Features Built

- View transactions and categories in responsive tables
- Create new categories and transactions through form pages
- Link each transaction to a category through a select input
- Open individual transaction and category pages for editing
- Delete categories and transactions directly from the list views
- Fetch categories and transactions using RESTful APIs connected through PostgreSQL

## Challenges Faced 

- Adding an inline delete button to all rows in the category and transaction table, while maintaining the hover<br>
effect only on the information (i.e., name, amount, description, etc.)
- Implementing the add and update endpoints for category and transaction tables, specifically syncing the<br>
changes from the database into properly displaying on the user interface
- Transitioning from traditional CSS to Tailwind CSS slowed development initially because the utility-first<br>
approach required shifting away from the fine-grained, pixel-level control that traditional CSS provides

## Next Steps

- Implement JWT-based authentication to give each user a secure, private finance profile while keeping the<br> 
auth flow aligned with the existing Express.js API structure
- Replaced inline delete buttons on each row with a single delete button that toggles a checklist selection<br>
mode, allowing users to select and remove multiple entries at once for a cleaner and more fluid UI
- Add a landing page to mimic a real-world web application, as well as provide key detail about the purpose<br>
of the application and why it is needed
- Add a widget that allows users to create a budget and allocate funds to different categories; each transaction<br>
will automatically calculate the new budget after a recent transaction from the category
- The application currently triggers a full page reload after deleting entries, which could be improved by<br>
implementing dynamic UI updates with state management for a smoother user experience

## Setup Instructions

1. Install dependencies in both apps:

	- `cd client && npm install`
	- `cd ../server && npm install`

2. Configure environment variables for the frontend and backend.

	- The client expects `NEXT_PUBLIC_API_HOST` to point to the backend server.
	- The server expects `DATABASE_URL` and optional `DB_SSL` in `server/.env.development`.

3. Start the backend from the `server` folder:

	- `npm run dev`

4. Start the frontend from the `client` folder:

	- `npm run dev`

5. Open the client in your browser and use the category and transaction pages to manage data.