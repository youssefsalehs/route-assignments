const fs = require("node:fs/promises");
//get all users from the file (db)
async function getAllUsers() {
  try {
    const data = await fs.readFile("./users.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}
//get user by id from the file (db)
async function getUserById(userId) {
  const users = await getAllUsers();
  const requiredUser = users.find((user) => user.id === userId);
  return requiredUser || null;
}
//get user by name from the file (db)
async function getUsersByName(name) {
  const users = await getAllUsers();
  const requiredUsers = users.filter(
    (user) => user.name?.toLowerCase() === name?.toLowerCase(),
  );
  return requiredUsers || [];
}
//filter users by minimum age from the file (db)
async function filterUsersByAge(age) {
  const users = await getAllUsers();
  const requiredUsers = users.filter((user) => user.age >= age);
  return requiredUsers || [];
}
//inser new user into the file (db)
async function createUser(newUser) {
  let users = await getAllUsers();
  const { name, email, age } = newUser;
  const alreadyExists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
  if (alreadyExists) {
    return { message: "Email Already Exists", statusCode: 400 };
  } else {
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    newUser.id = newId;
    users.push(newUser);
    await fs.writeFile("./users.json", JSON.stringify(users), "utf-8");
    return { message: "User Successfully Created", statusCode: 201 };
  }
}
//update user data into the file (db)
async function updateUser(userId, updates) {
  const users = await getAllUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return {
      statusCode: 404,
      message: "User Id Not Found",
    };
  }
  if (
    updates.email &&
    users.some((user) => user.email === updates.email && user.id !== userId)
  ) {
    return {
      statusCode: 400,
      message: "Email Already Exists",
    };
  }
  let updatedField = "";

  if (updates.name !== undefined) {
    users[index].name = updates.name;
    updatedField = "name";
  } else if (updates.email !== undefined) {
    users[index].email = updates.email;
    updatedField = "email";
  } else if (updates.age !== undefined) {
    users[index].age = updates.age;
    updatedField = "age";
  } else {
    return {
      statusCode: 400,
      message: "No valid field provided",
    };
  }
  await fs.writeFile("./users.json", JSON.stringify(users), "utf-8");

  return {
    statusCode: 200,
    message: `User ${updatedField} Updated Successfully`,
  };
}
//delete user from the file (db)
async function deleteUser(userId) {
  const users = await getAllUsers();
  const requiredUser = users.find((user) => user.id === userId);
  if (!requiredUser) {
    return {
      statusCode: 404,
      message: "User Id Not Found",
    };
  }
  const updatedUsers = users.filter((user) => user.id !== requiredUser.id);
  await fs.writeFile("./users.json", JSON.stringify(updatedUsers), "utf-8");
  return {
    statusCode: 204,
  };
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByName,
  filterUsersByAge,
};
