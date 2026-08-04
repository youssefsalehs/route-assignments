const http = require("node:http");
const path = require("node:path");
const url = require("node:url");
const userRepository = require("./users.repository");
//Port number
const PORT = 8000;
//create server
const server = http.createServer(async (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const method = req.method;

  //get all users
  if (pathname === "/user" && method === "GET") {
    const users = await userRepository.getAllUsers();

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(users);
  }
  // get user by id
  if (pathname.startsWith("/user/") && method === "GET") {
    const userId = Number(pathname.split("/")[2]);
    const requiredUser = await userRepository.getUserById(userId);
    if (requiredUser) {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      return res.end(requiredUser);
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify({ message: "User Not Found." }));
    }
  }
  // create new user
  if (pathname === "/user" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const { name, email, age } = JSON.parse(body);
      const result = await userRepository.createUser({ name, email, age });

      res.writeHead(result.statusCode, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify({ message: result.message }));
    });

    return;
  }
  // edit user data
  if (pathname.startsWith("/user/") && method === "PATCH") {
    const userId = Number(pathname.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const updates = JSON.parse(body);

      const result = await userRepository.updateUser(userId, updates);

      res.writeHead(result.statusCode, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify({ message: result.message }));
    });

    return;
  }
  // delete a user
  if (pathname.startsWith("/user/") && method === "DELETE") {
    const userId = Number(pathname.split("/")[2]);
    const result = await userRepository.deleteUser(userId);
    res.writeHead(result.statusCode, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: result.message }));
  }

  //welcoming messsage to the server
  if (pathname === "/" && method === "GET") {
    return res.end("Welcome to the server");
  }
  // If no route matched
  res.writeHead(404, {
    "Content-Type": "application/json",
  });
  return res.end(JSON.stringify({ message: "This route doesn't exist" }));
});

//listening to the server
server.listen(PORT, () => {
  console.log(`working on port ${PORT}`);
});
