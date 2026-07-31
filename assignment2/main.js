const path = require("node:path");
const fs = require("node:fs");
const { EventEmitter } = require('node:events')
const os = require("os");

//1)
function logFileAndDirectory() {
  const filePath = path.resolve(__filename);
  const parsed = path.parse(filePath);

  console.log({ File: path.join(parsed.dir, parsed.base), Dir: parsed.dir });
}

logFileAndDirectory();

//2)
function getFileName(givenPath) {
  const filename = path.basename(givenPath);
  return filename;
}
const fileName = getFileName("/user/files/report.pdf");
console.log(fileName);

//3)
function generatePath(object) {
  const result = path.join(object.dir, object.name + object.ext);
  return result;
}
const result = generatePath({ dir: "/folder", name: "app", ext: ".js" });
console.log(result);

//4)
function getExtension(givenPath) {
  return path.extname(givenPath);
}
console.log(getExtension("/docs/readme.md"));

//5)
function parsedPath(givenPath) {
  const parsed = path.parse(givenPath);
  return {
    Name: parsed.name,
    Ext: parsed.ext,
  };
}
const parsed = parsedPath("/home/user/file.txt");
console.log(parsed);

//6)
function checkAbsolutePath(givenPath) {
  return path.isAbsolute(givenPath);
}
console.log(checkAbsolutePath("/home/user/file.txt"));

//7)
function joinSegments(...segments) {
  return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js"));

//8)
const pathResolver = (givenPath) => {
  return path.resolve(givenPath);
};
console.log(pathResolver("./main.js"));
//9)
const pathJoiner = (path1, path2) => {
  return path.join(path1, path2);
};
console.log(pathJoiner("/folder1", "folder2/file.txt"));
//10)
const fileRemove = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
      return;
    }

    console.log(`${filePath} was deleted.`);
  });
};

// fileRemove('./m.txt')
//11)
function createFolder(folderPath) {
  try {
    fs.mkdirSync(folderPath);
    console.log("Success");
  } catch (err) {
    console.error("Error creating folder:", err.message);
  }
}
createFolder("./newFolder");
//12)
const startEvent = new EventEmitter();
startEvent.on('start', () => {
  console.log('welcome event triggered!')
})
startEvent.emit('start')
//13)
const loginEvent = new EventEmitter();
loginEvent.on('login', (name) => {
  console.log(`user Logged in : ${name}`)
})
loginEvent.emit('login',"Youssef")
//14)
function fileReader(filePath) {
  try {
    const data = fs.readFileSync(filePath,{encoding:'utf-8'});
    console.log(`the file content => ${data}`)
  }
  catch (err) {
    console.log(err.message)
  }
}
fileReader('./notes.txt')
//15)
function writeAsync(fileName, data) {
  fs.writeFile(fileName, data, { flag: "a" }, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Data written successfully.");
  });
}
writeAsync("./async.txt", "Async save")

//16)
function checkIfExists(filePath) {
  return fs.existsSync(filePath)
}
console.log(checkIfExists('./m.txt'))

//17)
function deviceDetails() {
  return {Platform: os.platform(), Arch: os.arch()}
}
console.log(deviceDetails())
