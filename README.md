TinyLink – URL Shortener Application

TinyLink is a lightweight URL shortener similar to bit.ly. It allows users to create short links, view statistics, and manage URLs through a clean dashboard interface. This project was built using Node.js, Express, EJS, and PostgreSQL (Neon).

Live Demo
(Add your deployed Render/Railway URL here)

GitHub Repository
(Add your GitHub repository link here)

Video Walkthrough
(Add your Loom/YouTube link here)

ChatGPT Transcript
This project includes assistance from ChatGPT, and the transcript can be provided upon request.

Features

Create Short Links

Convert long URLs into short custom codes.

Codes follow the format [A-Za-z0-9]{6,8}.

URL validation is performed before saving.

Redirect

Visiting /{code} redirects the user to the original URL with an HTTP 302.

Each visit increments the click count.

The last-clicked timestamp updates automatically.

Dashboard

Displays all short links with columns: code, target URL, total clicks, and last clicked time.

Options to add and delete links.

Responsive and simple UI.

Stats Page

Accessible at /code/:code

Shows target URL, click count, and last clicked date.

Delete Links

Remove any short link.

After deletion, /{code} returns 404.

Health Check Endpoint

GET /healthz

Returns JSON: { "ok": true, "version": "1.0" }

API Endpoints

POST /api/links
Create a new short link. Returns 409 if the code already exists.

GET /api/links
List all saved links.

GET /api/links/:code
Get stats for a specific short link.

DELETE /api/links/:code
Delete a short link.

Project Structure

tinylink/
│ package.json
│ .env
│ README.md
│ public/styles.css
│
└── src/
├── server.js
├── db.js
├── routes/
│ ├── api.js
│ └── pages.js
└── views/
├── layout.ejs
├── dashboard.ejs
└── stats.ejs

Installation and Setup

Clone the repository
git clone https://github.com/YOUR_USERNAME/tinylink

cd tinylink

Install dependencies
npm install

Configure environment variables
Copy the example file:
cp .env.example .env

Update .env with your Neon PostgreSQL connection URL:
DATABASE_URL=your_neon_database_url
BASE_URL=http://localhost:3000

PORT=3000

Run locally
npm run dev
Open your browser at http://localhost:3000

Database

This project uses PostgreSQL hosted on Neon.
On startup, the following table is created automatically:

CREATE TABLE IF NOT EXISTS links (
code VARCHAR(10) PRIMARY KEY,
url TEXT NOT NULL,
clicks INT DEFAULT 0,
last_clicked TIMESTAMP
);

Deployment

The application can be deployed for free using services like Render or Railway.
Set the following environment variables in the hosting dashboard:

DATABASE_URL=your_neon_database_url
BASE_URL=https://your-live-url

PORT=10000 (Render automatically sets PORT)

Assignment Requirements (All Completed)

Create short links

Redirect URL

Track clicks

Stats page

Dashboard UI

Delete links

Health endpoint

Free hosting

GitHub repository

Video walkthrough

License
MIT License.
