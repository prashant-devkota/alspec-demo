# Project structure

# Running the api project
- Open Visual Studio
- Open Alspec.sln file
- Update connection strings in Alspec.API > appsettings.json and appsettings.Development.json
- Build the solution
- Make sure that Alspec.API is selected as the start-up project
- Run a Debug http session using the Debug ▶️ button
- Wait for the localhost swagger to load
- Database, entities and sample data should be created on startup
- Run the web project using the steps below

# Running the web project
- Open Alspec.web folder using VS Code command terminal or any other terminal of your choice
- Make sure that the api link is updated in the .env, .env.development, .env.production and .env.staging files
	- API link should be something like http://localhost:5057/api depending on your api project link 
- run the following commands
  - npm install
  - npm run start
