# User Sign up
- database user record save
- email, send welcome user email (event or async await)

# User Login

- inpput=> req.body => email, password
 - if email and password doesn't match =>throw error
 - output=> jwt token

 # User list API (admin)

 - if user is admin, show list of user
 - if user is not admin, throw unauthorized error

 -How?? By using JWT Token; by sending jwt token through headers.

 # Utils

 - secure => Verify JWT Token with checkRole middleware
 - token => generateToken, verifyToken, checkRole