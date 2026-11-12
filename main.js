import Tree from "./Tree.js";

function getRandomArray(length = 15, max = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

const tree = new Tree(getRandomArray());
console.log(tree.isBalanced());

console.log("\nPreOrder:");
tree.preOrderForEach((value) => console.log(value));

console.log("\nPostOrder:");
tree.postOrderForEach((value) => console.log(value));

console.log("\nInOrder:");
tree.inOrderForEach((value) => console.log(value));
console.log();

tree.insert(938);
tree.insert(154);
tree.insert(326);
tree.insert(485);
tree.insert(215);

console.log(tree.isBalanced());

tree.rebalance();
console.log();
console.log(tree.isBalanced());

console.log("\nPreOrder:");
tree.preOrderForEach((value) => console.log(value));

console.log("\nPostOrder:");
tree.postOrderForEach((value) => console.log(value));

console.log("\nInOrder:");
tree.inOrderForEach((value) => console.log(value));
