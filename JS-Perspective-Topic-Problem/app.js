// 1.
const str = "backend";
const result = str.split("").reverse().join("");

// 2.
const str1 = "madam";
// console.log(str1 === str1.split("").reverse().join(""));

// 3.
const str2 = "banana";
const output = {};
for (let i = 0; i < str2.length; i++) {
  const char = str2[i];
  output[char] = (output[char] || 0) + 1;
}
// console.log(output);

// 4.

const nums = [1, 2, 3, 2, 4, 5, 3, 6];

function findDuplicates(arr) {
  const freq = {};

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    freq[char] = (freq[char] || 0) + 1;
  }

  const result = [];
  for (const [key, value] of Object.entries(freq)) {
    if (value > 1) result.push(Number(key));
  }
  return result;
}

const duplicates = findDuplicates(nums);
// console.log(duplicates);

//5.

const nums2 = [1, 2, 2, 3, 4, 4, 5];

function removeDuplicates(arr) {
  let st = new Set();

  for (let i of arr) {
    st.add(i);
  }

  const result = [];
  for (let i of st) {
    result.push(i);
  }

  return result;
}

const answer = removeDuplicates(nums2);
// console.log(answer);

// 6.

const users = [
  { name: "John", role: "Admin" },
  { name: "Alice", role: "User" },
  { name: "Bob", role: "Admin" },
  { name: "David", role: "User" },
];

function groupByRole(ipObj) {
  const result = ipObj.reduce((acc, user) => {
    if (!acc[user.role]) {
      acc[user.role] = [];
    }

    acc[user.role].push(user);

    return acc;
  }, {});

  return result;
}

const roles = groupByRole(users);
// console.log(roles);

// 7.

const orders = [
  { customerId: 1, amount: 500 },
  { customerId: 1, amount: 1000 },
  { customerId: 2, amount: 400 },
  { customerId: 3, amount: 300 },
  { customerId: 3, amount: 200 },
];

function aggregate(arr) {
  const result = Object.values(
    arr.reduce((acc, item) => {
      if (!acc[item.customerId]) {
        acc[item.customerId] = {
          customerId: item.customerId,
          totalSpent: 0,
        };
      }
      acc[item.customerId].totalSpent += item.amount;
      return acc;
    }, {}),
  );

  return result;
}

const aggregateAnswer = aggregate(orders);
// console.log(aggregateAnswer);

// 8.

const employees = [
  { name: "John", salary: 50000 },
  { name: "Alice", salary: 70000 },
  { name: "Bob", salary: 60000 },
];

function highestPaidSalary(arr) {
  let hightestPaidPerson = arr[0];

  for (let item of arr) {
    if (item.salary > hightestPaidPerson.salary) {
      hightestPaidPerson = item;
    }
  }

  return hightestPaidPerson;
}

const highest = highestPaidSalary(employees);
// console.log(highest);

// 9.

const users1 = [
  { name: "John", age: 30 },
  { name: "Alice", age: 22 },
  { name: "Bob", age: 27 },
];

function sortByAgeUsingBuiltIn(arr) {
  return arr.sort((a, b) => a.age - b.age);
}

function sortByAgeWithoutBuiltIn(arr) {
  const result = [...arr];

  let n = result.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; i++) {
      if (result[j].age > result[j + 1].age) {
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}

const output1 = sortByAgeUsingBuiltIn(users1);
// console.log(output1);

const output2 = sortByAgeWithoutBuiltIn(users1);
// console.log(output2);

// 10.
const nums3 = [1, 2, 3, 4, 6];

// input will always from 1 to N

function findMissingNumber(arr) {
  let n = arr.length;
  let xor1 = 0;
  let xor2 = 0;

  for (let num of arr) {
    xor1 ^= num;
  }

  for (let i = 1; i <= n + 1; i++) {
    xor2 ^= i;
  }

  return xor1 ^ xor2;
}

const result1 = findMissingNumber(nums3);
// console.log(result1);

// 11.

const nums4 = [1, [2, [3, 4]], 5];

function flattenArray(arr) {
  let result = [];

  for (let num of arr) {
    if (Array.isArray(num)) {
      result.push(...flattenArray(num));
    } else {
      result.push(num);
    }
  }

  return result;
}

const flatArray = flattenArray(nums4);
// console.log(flatArray);

// 12.

const sentence = "node js node express js node";

function countOccurrences(str) {
  const words = str.split(" ");

  let result = {};

  for (let w of words) {
    if (!result[w]) {
      result[w] = 0;
    }

    result[w]++;
  }

  return result;
}

const obj = countOccurrences(sentence);
// console.log(obj);

// 13. Find Intersection of Two Arrays

const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

/*
Expected Output: [3, 4]
*/

function findIntersection(arr1, arr2) {
  let n = arr1.length;
  let m = arr2.length;

  let result = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr1[i] == arr2[j]) {
        result.push(arr1[i]);
      }
    }
  }

  return result;
}

const intersect = findIntersection(array1, array2);
// console.log(intersect);

// 14. Merge Users with Their Orders

// I/P :

const user = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
];

const order = [
  { userId: 1, product: "Laptop" },
  { userId: 1, product: "Mouse" },
  { userId: 2, product: "Keyboard" },
];

/* 
output : 
[
    {
        id: 1,
        name: "John",
        orders: ["Laptop", "Mouse"]
    },
    {
        id: 2,
        name: "Alice",
        orders: ["Keyboard"]
    }
]
*/

function mergeUsers(userArray, orderArray) {
  let result = {};

  for (let item of userArray) {
    result[item.id] = {
      id: item.id,
      name: item.name,
      orders: [],
    };
  }

  for (let order of orderArray) {
    result[order.userId].orders.push(order.product);
  }

  return Object.values(result);
}

const userDetails = mergeUsers(user, order);
// console.log(userDetails);

// 15.

const nums5 = [10, 5];

/*
I. 
num = 10 , num > highest(-Infinity) (yes) => secondHighest = -Infinity , highest = 10;

II.
num = 5, num > highest(10) (No) else num > secondHighest && num != highest (yes) so secondHighest = 5

*/

function secondHighestNumber(arr) {
  let n = arr.length;

  let highest = -Infinity;
  let secondHighest = -Infinity;

  for (let num of arr) {
    if (num > highest) {
      secondHighest = highest;
      highest = num;
    } else if (num > secondHighest && num !== highest) {
      secondHighest = num;
    }
  }
  return secondHighest;
}

const highestNumber = secondHighestNumber(nums5);
// console.log(highestNumber);

// 16.

const products = [
  { name: "iPhone", category: "Mobile" },
  { name: "Samsung", category: "Mobile" },
  { name: "MacBook", category: "Laptop" },
];

function groupByCategory(arr) {
  let result = arr.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push({ name: item.name, category: item.category });
    return acc;
  }, {});

  return result;
}

const categories = groupByCategory(products);
// console.log(categories);

// 17. Find Users Who Never Ordered

const users2 = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 3, name: "Bob" },
];

const orders2 = [{ userId: 1 }, { userId: 3 }];

function userWhoNeverOrder(users, orders) {
  // const obj = {};

  // for (const user of users) {
  //   obj[user.id] = 0;
  // }

  // for (const order of orders) {
  //   obj[order.userId]++;
  // }

  // return users.filter((user) => obj[user.id] == 0);

  //2nd approach

  const orderedUsers = new Set();

  for (let order of orders) {
    orderedUsers.add(order.userId);
  }

  return users.filter(user => !orderedUsers.has(user.id));
}

const user3 = userWhoNeverOrder(users2, orders2);
console.log(user3);



