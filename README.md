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
- A demo app should look like this
  
![image](https://github.com/user-attachments/assets/bbfae009-ff77-4a4d-bb86-5f24e917fa00)

- Add a new job or use the swagger to pass in a full json to see how the create works
- When using swagger to add a new job, make sure to not add the same Job.Id and SubItem.ItemId or remove them completely

# Project structure
- Alspec.API project references few other projects to make sure that proper patterns and software principles are followed in an effective manner
- Web project uses Tailwing css and other react components to achieve the required behaviour
- The project is perfect for Alspec build, just need to add auth and more functionalities 🙂
- Project structure
1 = API main project
2 = Web main project
The rest are supporting projects 

![image](https://github.com/user-attachments/assets/82665949-3e29-4e44-b3c7-4ea442308d40)

- Use of Unit of Work and Repository pattern in the backend
- Code first Entity Framework with seed data from the code
- Code should create the database and the seed data
- Get and post API should work
- SQL Server for database 
