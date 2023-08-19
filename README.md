## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Rijal666/test-rankaddict.git
   ```
2. Install npm packages
   ```sh
   npm i
   ```
3. create you're Database in PostgreSQL and setting DBurl in folder config/Database.js
   ```sh
  const db = new Sequelize("your_dbname", "postgres", "your_password", {
  host: "localhost",
  dialect: "postgres",
});
   ```

### Usage

1. Run the App with.

   ```sh
   node index.js
   ```
