const path = require("path");

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
