const express = require('express');
const router = express.Router();

let users = [
  {
    firstName: "John",
    lastName: "wick",
    email:"johnwick@gamil.com",
    DOB:"22-01-1990",
  },
  {
    firstName: "John",
    lastName: "smith",
    email:"johnsmith@gamil.com",
    DOB:"21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "white",
    email:"joyalwhite@gamil.com",
    DOB:"21-03-1989",
  },
];

// GET request: Retrieve all users
router.get('/', (req, res) => {
  // Send a JSON response containing the users array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get('/:email', (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  res.send(filtered_users);
});

// 

// POST request: Create a new user
router.post('/', (req, res) => {
  // Example user to push via terminal
  // {"firstName":"Jon", "lastName":"Lovato", "email":"jonlovato@theworld.com", "DOB":"10/10/1995"}
  // curl --request POST 'localhost:5500/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995'
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  });

  res.send(`New user ${req.query.firstName} has been added`);
});

// PUT request: Update the details of a user by email ID
router.put('/:email', (req, res) => {
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0];

    // Extract and update data if provided
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let userEmail = req.query.email;
    let DOB = req.query.DOB;

    if (firstName) {
      filtered_user.firstName = firstName;
    }
    if (lastName) {
      filtered_user.lastName = lastName;
    }
    if (userEmail) {
      filtered_user.userEmail = userEmail;
    }
    if (DOB) {
      filtered_user.DOB = DOB;
    }

    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} has been updated.`);

  } else {
    // Send error message if no user found
    res.send("Unable to find that user.");
  }
});

// DELETE request: Delete a user by email ID
router.delete('/:email', (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;

  // Filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);

  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} has been deleted.`);
});

module.exports=router;
