const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		this.heapSize++;
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);

	}

	pop() {
		if (!this.isEmpty()) {
			let dr = this.detachRoot();
			this.restoreRootFromLastInsertedNode(dr);
			this.shiftNodeDown(this.root);
			return dr.data;
		}
	}

	detachRoot() {
		let dr = this.root;
		let par = this.parentNodes;
		if (par.includes(this.root)) par.shift();
		this.root = null;
		this.heapSize--;
		return dr;
	}

	restoreRootFromLastInsertedNode(detached) {
		let par = this.parentNodes;
		if (!this.isEmpty()) {
			this.root = par.pop();
			if (this.root.parent) {
				if (this.root.parent !== detached && this.root.parent.right === this.root) par.unshift(this.root.parent);
				this.root.remove();
				if (detached.left !== this.root && detached.left) this.root.appendChild(detached.left);
				if (detached.right !== this.root && detached.right) this.root.appendChild(detached.right);
				if (this.root.right === null) par.unshift(this.root);
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return ((this.root === null) && (this.parentNodes.length === 0));
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes = [node];
		} else {
			let par = this.parentNodes;
			par[0].appendChild(node);
			par.push(node);
			if (par[0].left && par[0].right) par.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				let par = this.parentNodes;
				let id = par.indexOf(node);
				let parId = par.indexOf(node.parent);
				if (id !== -1 && parId !== -1) {
					par[id] = node.parent;
					par[parId] = node;
				}
				if (id !== -1 && parId === -1) {
					par.splice(id, 1, node.parent);
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if (!node) return;
		let par = this.parentNodes;
		let id = par.indexOf(node);
		let childNode = node.left;
		if (childNode) {
			if (node.right && (node.right.priority > node.left.priority)) {
				childNode = node.right;
			}

			if (node.priority < childNode.priority) {
				let childId = par.indexOf(childNode);
				if (node === this.root) this.root = childNode;
				if (childId !== -1) {
					if (id === -1) {
						par.splice(childId, 1, node);
					} else {
						par[id] = childNode;
						par[childId] = node;
					}
				}
				childNode.swapWithParent();
				this.shiftNodeDown(node);
			}
			
		}
	}
}

module.exports = MaxHeap;
