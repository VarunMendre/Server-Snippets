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
