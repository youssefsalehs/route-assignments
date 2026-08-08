const express = require("express");
const app = express();
const PORT = 3000;
const userRepository = require("./users.repository");

app.use(express.json());

app
  .route("/user")
  .get(async (req, res) => {
    const users = await userRepository.getAllUsers();
    return res.status(200).json(users);
  })
  .post(async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = { name, email, age };
    const result = await userRepository.createUser(newUser);
    return res.status(result.statusCode).json(result.message);
  });
app.route("/user/getByName").get(async (req, res) => {
  const { name } = req.query;
  const users = await userRepository.getUsersByName(name);
  if (users.length === 0) {
    return res.status(400).json({ message: "user name not found" });
  }
  return res.status(200).json(users);
});
app.route("/user/filter").get(async (req, res) => {
  const { minAge } = req.query;
  const users = await userRepository.filterUsersByAge(minAge);
  if (users.length === 0) {
    return res.status(400).json({ message: "no user found" });
  }
  return res.status(200).json(users);
});
app
  .route("/user/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: " id must be included" });
    }
    const requiredUser = await userRepository.getUserById(id);
    if (!requiredUser) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(requiredUser);
  })
  .patch(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const result = await userRepository.updateUser(id, updates);
    return res.status(result.statusCode).json(result.message);
  });
app.route("/user{/:id}").delete(async (req, res) => {
  const id = req.params.id || req.body.id;
  if (!id) {
    return res.status(400).json({ message: "id must be included" });
  }
  const result = await userRepository.deleteUser(id);
  return res.status(result.statusCode).json({
    message: result.message,
  });
});

app.listen(PORT, () => {
  console.log(`surver running on port ${PORT}`);
});
