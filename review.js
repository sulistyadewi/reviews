let firstName = "sulistyadewi";
let lastName = "dewi";

console.log(
  `hello nama saya ${firstName} nama panjang saya ${firstName} ${lastName}`
);

let newName = "";

for (let i = 0; i <= firstName.length - 1; i++) {
  if (i === firstName.length - 1) {
    newName += "4";
  } else {
    newName += firstName[i];
  }
}
console.log(newName);
