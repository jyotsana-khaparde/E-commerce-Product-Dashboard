# Product Listing App

This repository contains a **Product Listing App** built with React. The app provides an interactive interface to view, filter, sort, and explore products fetched from the [Fake Store API](https://fakestoreapi.com/). It also includes infinite scrolling for seamless browsing and a detailed product modal for in-depth product information.

---

## Features

- **Product List**: Displays a list of products with their name, price, category, rating, and image.
- **Filtering**: Filter products by category, minimum price, and maximum price.
- **Sorting**: Sort products by price (ascending or descending) and rating (high to low).
- **Infinite Scrolling**: Automatically loads more products as you scroll down.
- **Product Modal**: View detailed information about a product in a modal.
- **Loading Indicators**: Visual feedback during data fetches to enhance user experience.
- **Error Handling**: Displays user-friendly error messages if data fetching fails.

---

## Installation and Setup

Follow these steps to set up and run the project locally:

### Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
- **npm or Yarn**: Package manager (npm comes with Node.js).

### Steps to Start the Project

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/product-listing-app.git
   cd product-listing-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── FilterSortBar.js     # Filter and Sort functionality
│   ├── ProductCard.js       # Individual product card
│   ├── ProductList.js       # Main product listing component
│   ├── ProductModal.js      # Modal for product details
├── pages/
│   ├── Dashboard.js         # Main Dashboard page
├── App.js                   # App entry point
├── index.js                 # React DOM renderer
```

---

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Fake Store API**: Provides sample product data.
