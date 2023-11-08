### MERN stack project

### Login info

demo user: songoku@gamil.com - password: 123456
or you can also click on the "Test User" button in the login page

### Introduce

This project use the new features of 'react-router-dom' package.

-   use loader to fetch API get data instead of using useEffect hook when the page is mounted
-   use action and <Form> component from 'react-router-dom' to send data to the server

### Feature

-   This project allows user register and create recruitment infomation
-   user can create/read/update/delete the announcement thay created
-   user can view stats of their created job's announcements in stat page - they can see how many job in pending/intervew/declined - thay can also see the chart from these data
-   user can change their infomation and upload/change profile picture in the profile page
-   only Amin can use admin page and read infomation of all job's announcements.

### Authentication and Authorization

-   use jwt and cookie to create and store token.
-   a user can not update/delete or view jobs of other users

### package used:

-   dayjs, recharts
-   react-router-dom, react-icons
-   bcryptjs, jwt
-   concurently, nodemone
-   cors, express-async-errors
-   Express framework
-   nanoid
-   mongoose
-   express-validator
-   multer, cloudinary
-   dotenv
-   et cetera
