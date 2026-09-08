// const obj = {
//   firstName: "Varun",
//   lastName: "Mendre",
//   getFullName() {
//     console.log(this);
//     function getName() {
//       console.log("Getting Name");
//       console.log(this.firstName);
//     }

//     getName();
//   },
// };

// obj.getFullName();

// const obj = {
//   firstName: "Varun",
//   lastName: "Mendre",
//   fruits: ["Apple", "Banana", "Blue-Berry", "Papaya"],
//   getFruits() {
//     this.fruits.forEach(function (fruit) {
//       console.log(this); // points to window object because we're passing a simple function you can fix this using passing this
//     });
//   },
// };

// obj.getFruits();

// const obj = {
//   firstName: "Varun",
//   lastName: "Mendre",
//   fruits: ["Apple", "Banana", "Blue-Berry", "Papaya"],
//   getFruits() {
//     this.fruits.forEach(function (fruit) {
//       console.log(this);
//     }, this);
//   },
// };

// obj.getFruits();

// const obj = {
//   firstName: "Varun",
//   lastName: "Mendre",
//   fruits: ["Apple", "Banana", "Blue-Berry", "Papaya"],
//   getFruits: () => {
//     console.log(this);
//   },
// };

// obj.getFruits();

const obj = {
  firstName: "Varun",
  lastName: "Mendre",
  fruits: ["Apple", "Banana", "Blue-Berry", "Papaya"],
  outerArrow: () => {
    console.log(this);
  },
  getFruits() {
    console.log(this);
    innerArrow = () => {
      console.log(this);
      innerMostArrow = () => {
        console.log(this);
      };
      innerMostArrow();
    };
    innerArrow();
  },
};

obj.outerArrow();
obj.getFruits();
