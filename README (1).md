# FlyZone
## Innovation in drone training technology

FlyZone is an innovative platform for training and assessment of drone operators of all levels. 
This side of the platform is the admin dashboard, a tool which purpose is to present the users' data in a straightforward and clear manner, including statistics and comparisons within and outside groups of users. 

## Frontend architecture:
### the frontend structure is as followes:
#### The *"src"* folder will include:
- "*Assets*" folder - includes images and other assets that were used in the app.
- "*Components*" folder - includes folders of reusable components, as well as the folder "*Generic*" that holds other reusavle elements.
- "*Pages*" folder - includes all folders for every single page in the app. Each folder contains two files: the "*.jsx*" and "*.css*"
- "*Router*" folder - holds the routing information.
- "*store*" folder - holds the *redux* slices. 
- "*validators*" folder - contains the "*validators.js*" file.
### The technologies:
- Redux


## Backend architecture:
### the backend is constructed upon:
- FASTApi
- SQLite
- SQLAlchemy
- Uvicorn

<p>
  <img src="../../Desktop/flyzoneproj/flyzone/src/assets/Drone1.png" width="350" title="hover text">
  <img src="../../Desktop/flyzoneproj/flyzone/src/assets/Drone1.png" width="350" alt="accessibility text">
</p>



Run the app in dev mode: *npm run dev*
Starting the server: *env/Scripts/activate*
                     *python -m uvicorn main:app --reload*