Project Overview

This project is a React-based web application developed as part of a technical challenge for WidaTech. The application focuses on creating an invoice module feature for a Point of Sales System. It includes functionalities to add invoices, display invoice cards, and project revenue through time-series graphs.

Features

    Add Invoice with Autocomplete for Product Input
    •	Date, customer name, salesperson name, notes (optional), and multiple products sold.
    •	Autocomplete product suggestions with product name, product picture, stock, and price.
    •	Form validation with warnings for invalid inputs and proper notifications on successful submission.
    •	POST API call to save the invoice.

    Invoice Card
    •	Displays published invoices with pagination.
    •	Shows a summary of the invoice including customer name, salesperson name, total amount paid, and notes.
    •	Lazy loading of invoice data from the backend using a GET API.

    Time-series Graph
    •	Displays revenue projection from invoices on daily, weekly, and monthly bases.
    •	Allows panning and zooming to specific periods.
    •	Auto-scrolls when new data is pushed.

Technologies Used

    Frontend:
    •	React.js
    •	Next.js 14
    •	Redux for state management
    •	Axios for API calls
    •	Tanstack Query for Data Caching
    •	Tailwind CSS for styling

    Backend:
    •	Node.js
    •	Express.js

    Database:
    •	MySQL
    •	Prisma ORM
