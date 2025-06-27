# LODA Statistics Information System

A web-based platform for publishing and managing open data related to communities, districts, healthcare facilities, communal enterprises, and news in Lviv Oblast, Ukraine.

## Technologies Used

### Back-end:
- Node.js – JavaScript runtime
- Express.js – Web server framework
- Sequelize – ORM for MySQL
- bcrypt – Password hashing
- express-session – Session management

### Database:
- MySQL – Relational database management system

### Admin Interface:
- AdminJS – UI for managing entities in the database

### Front-end:
- HTML5 and CSS3
- Vanilla JavaScript
- Responsive layout with animations
- Dark mode support

## Project Structure

├── index.js # Main server file (Express + routes)
├── models/ # Sequelize models (user, community, dataset, etc.)
├── public/ # Static HTML pages (communities.html, datasets.html, ...)
├── admin/ # AdminJS configuration
├── .env # Environment variables (not included in version control)

bash
Copy
Edit

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/loda-stat.git
cd loda-stat
2. Install dependencies
bash
Copy
Edit
npm install
3. Create a .env file
ini
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=loda
SESSION_SECRET=your-secret
4. Start the server
bash
Copy
Edit
node index.js
The project will run at: http://localhost:3000

API Endpoints
Method	Route	Description
GET	/api/communities	Get list of communities
GET	/api/community/:id	Get details of a specific community
GET	/api/datasets	Get list of datasets
POST	/api/datasets/new	Submit a new dataset (via form)

User Roles
admin – Full access (AdminJS panel)

publisher – Can create datasets, news, etc.

viewer – Read-only access

Main Database Tables
district – Administrative districts

community – Territorial communities

healthcare_facility, communal_enterprise – Health and communal facilities

dataset, resource – Data packages and attached files

news, tag, group – News articles and categorization

user – Registered system users

activity_log – Logs of user actions

Features
Dynamic data loading via API

Search and filtering in UI

Role-based access control

Admin panel with entity management

Author
This project was developed during an internship at the
Department of Digital Development of the Lviv Regional State Administration in 2025.
