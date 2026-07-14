//1)
let x = "123";
let y = 7;
const result = Number(x) + y;
console.log(result);
//2)
function check(value) {
  return value || "invalid";
}

console.log(check(""));
//3)
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

//4)
let a = [2, 4, 5, 10, 12, 5, 11, 16, 13, 19];
let filtered = a.filter((num) => num % 2 == 0);
console.log(filtered);

//5)
function mergeArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

console.log(mergeArrays(arr1, arr2));

//6)
let day = 2;

switch (day) {
  case 1:
    console.log("Sunday");
    break;
  case 2:
    console.log("Monday");
    break;
  case 3:
    console.log("Tuesday");
    break;
  case 4:
    console.log("Wednesday");
    break;
  case 5:
    console.log("Thursday");
    break;
  case 6:
    console.log("Friday");
    break;
  case 7:
    console.log("Saturday");
    break;
  default:
    console.log("Invalid day number");
}

//7)
function findLength(strArr) {
  let lenArr = strArr.map((word) => word.length);
  return lenArr;
}
console.log(findLength(["a", "ab", "abc"]));

//8)
function checkDivisbleByfiveAndThree(val) {
  return val % 3 === 0 && val % 5 === 0
    ? "Divisible by both"
    : "Not Divisible by both";
}
let res = checkDivisbleByfiveAndThree(32);
console.log(res);
//9)
const squareFn = (val) => val ** 2;
console.log(squareFn(2));

//10)
function details(studentObj) {
  return `${studentObj?.name} is ${studentObj?.age} years old`;
}
console.log(details({ name: "ali", age: 15 }));

//11)
function summation(...args) {
  return args.reduce((sum, num) => sum + num, 0);
}
console.log(summation(1, 2, 3, 4, 5, 6, 7));
//12
function getMessage() {
  return "Success";
}

function promiseFn(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, 3000);
  });
}

promiseFn(getMessage).then((d) => console.log(d));

//13)
function findMax(arr) {
  return Math.max(...arr);
}

console.log(findMax([1, 3, 7, 2, 4]));

//14)
const obj1 = { name: "John", age: 30 };
function getKeys(obj) {
  return Object.keys(obj);
}
console.log(getKeys(obj1));
//15)
function splitter(str) {
  let res = str.split(" ");
  return res;
}
console.log(splitter("The quick brown fox"));
