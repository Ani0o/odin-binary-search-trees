class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  #arrayToBST(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(array[mid]);

    root.left = this.#arrayToBST(array, start, mid - 1);
    root.right = this.#arrayToBST(array, mid + 1, end);

    return root;
  }

  #buildTree(array) {
    array.sort((a, b) => a - b);

    let element = array[0];
    let i = 1;
    while (i < array.length) {
      if (array[i] === element) {
        array.splice(i, 1);
      } else {
        element = array[i];
        i++;
      }
    }

    return this.#arrayToBST(array, 0, array.length - 1);
  }

  includes(value) {
    let tempTree = this.root;
    while (tempTree !== null) {
      if (tempTree.data === value) {
        return true;
      } else if (value < tempTree.data) {
        tempTree = tempTree.left;
      } else {
        tempTree = tempTree.right;
      }
    }
    return false;
  }

  insert(value, root = this.root) {
    const temp = new Node(value);

    if (root === null) {
      this.root = temp;
      return;
    }

    let curr = root;
    while (curr !== null) {
      if (curr.data === value) {
        this.root = root;
        return;
      } else if (curr.data > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < value && curr.right !== null) {
        curr = curr.right;
      } else {
        break;
      }
    }

    if (curr.data > value) {
      curr.left = temp;
    } else {
      curr.right = temp;
    }
  }

  #getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) curr = curr.left;
    return curr;
  }

  deleteItem(value, root = this.root) {
    if (root === null) return root;

    if (root.data > value) root.left = this.deleteItem(value, root.left);
    else if (root.data < value) root.right = this.deleteItem(value, root.right);
    else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      const succ = this.#getSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteItem(succ.data, root.right);
    }

    return root;
  }

  levelOrderForEach(callback) {
    if (callback === undefined)
      throw new Error("A callback function is required!");

    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const curr = queue[0];
      callback(curr.data);
      if (curr.left !== null) queue.push(curr.left);
      if (curr.right !== null) queue.push(curr.right);
      queue.shift();
    }
  }

  #inorder(root, callback) {
    if (root === null) return;
    this.#inorder(root.left, callback);
    callback(root.data);
    this.#inorder(root.right, callback);
  }

  inOrderForEach(callback) {
    if (callback === undefined)
      throw new Error("A callback function is required!");
    this.#inorder(this.root, callback);
  }

  #preorder(root, callback) {
    if (root === null) return;
    callback(root.data);
    this.#preorder(root.left, callback);
    this.#preorder(root.right, callback);
  }

  preOrderForEach(callback) {
    if (callback === undefined)
      throw new Error("A callback function is required!");
    this.#preorder(this.root, callback);
  }

  #postorder(root, callback) {
    if (root === null) return;
    this.#postorder(root.left, callback);
    this.#postorder(root.right, callback);
    callback(root.data);
  }

  postOrderForEach(callback) {
    if (callback === undefined)
      throw new Error("A callback function is required!");
    this.#postorder(this.root, callback);
  }

  #findHeights(root, h, arr) {
    if (root === null) return;
    this.#findHeights(root.left, h + 1, arr);
    this.#findHeights(root.right, h + 1, arr);
    if (root.left === null && root.right === null) {
      arr.push(h);
    }
  }

  height(value) {
    const arr = [];
    let root = null;

    let tempTree = this.root;
    while (tempTree !== null) {
      if (tempTree.data === value) {
        root = tempTree;
        break;
      } else if (value < tempTree.data) {
        tempTree = tempTree.left;
      } else {
        tempTree = tempTree.right;
      }
    }

    this.#findHeights(root, 0, arr);

    if (arr.length === 0) return undefined;
    return Math.max(...arr);
  }

  depth(value) {
    let tempTree = this.root;
    let h = 0;
    while (tempTree !== null) {
      if (tempTree.data === value) {
        return h;
      } else if (value < tempTree.data) {
        tempTree = tempTree.left;
        h++;
      } else {
        tempTree = tempTree.right;
        h++;
      }
    }
    return undefined;
  }

  isBalanced() {
    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const curr = queue[0];

      if (curr.left !== null && curr.right === null) {
        if (this.height(curr.left.data) > 1) return false;
      } else if (curr.left === null && curr.right !== null) {
        if (this.height(curr.right.data) > 1) return false;
      } else if (curr.left !== null && curr.right !== null) {
        if (
          this.height(curr.left.data) - this.height(curr.right.data) > 1 ||
          this.height(curr.left.data) - this.height(curr.right.data) < -1
        ) {
          return false;
        }
      }

      if (curr.left !== null) queue.push(curr.left);
      if (curr.right !== null) queue.push(curr.right);
      queue.shift();
    }

    return true;
  }

  rebalance() {
    const array = [];
    this.inOrderForEach((value) => array.push(value));
    this.root = this.#buildTree(array);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

export default Tree;
