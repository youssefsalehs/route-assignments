import fs from "node:fs/promises";
//get all users from the file (db)
export async function getAllUsers() {
  try {
    const data = await fs.readFile("./users.json", "utf8");
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
//get user by id from the file (db)
export async function getUserById(userId) {
  const users = await getAllUsers();
  const parsedUsers = JSON.parse(users);
  const requiredUser = parsedUsers.find((user) => user.id === userId);
  return JSON.stringify(requiredUser);
}
//inser new user into the file (db)
export async function createUser(newUser) {
  const users = await getAllUsers();
  const { name, email, age } = newUser;
  const parsedUsers = JSON.parse(users);
  const alreadyExists = parsedUsers.find((user) => user.email === email);
  if (alreadyExists) {
    return { message: "User Already Exists", statusCode: 400 };
  } else {
    const newId = parsedUsers[parsedUsers.length - 1].id + 1;
    newUser.id = newId;
    parsedUsers.push(newUser);
    await fs.writeFile("./users.json", JSON.stringify(parsedUsers), "utf-8");
    return { message: "User Successfully Created", statusCode: 201 };
  }
}
//update user data into the file (db)
export async function updateUser(userId, updates) {
  const users = await getAllUsers();
  const parsedUsers = JSON.parse(users);
  const index = parsedUsers.findIndex((user) => user.id === userId);
  if (index === -1) {
    return {
      statusCode: 404,
      message: "User Id Not Found",
    };
  }
  let updatedField = "";

  if (updates.name !== undefined) {
    parsedUsers[index].name = updates.name;
    updatedField = "name";
  } else if (updates.email !== undefined) {
    parsedUsers[index].email = updates.email;
    updatedField = "email";
  } else if (updates.age !== undefined) {
    parsedUsers[index].age = updates.age;
    updatedField = "age";
  } else {
    return {
      statusCode: 400,
      message: "No valid field provided",
    };
  }
  await fs.writeFile("./users.json", JSON.stringify(parsedUsers), "utf-8");

  return {
    statusCode: 200,
    message: `User ${updatedField} Updated Successfully`,
  };
}
//delete user from the file (db)
export async function deleteUser(userId) {
  const users = await getAllUsers();
  const parsedUsers = JSON.parse(users);
  const requiredUser = parsedUsers.find((user) => user.id === userId);
  if (!requiredUser) {
    return {
      statusCode: 404,
      message: "User Id Not Found",
    };
  }
  const updatedUsers = parsedUsers.filter(
    (user) => user.id !== requiredUser.id,
  );
  await fs.writeFile("./users.json", JSON.stringify(updatedUsers), "utf-8");
  return {
    statusCode: 204,
  };
}
