class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		} else {
			return this;
		}
	}

	removeChild(node) {
		switch (node) {
			case this.left:
				this.left.parent = null;
				this.left = null;
				break;
			case this.right:
				this.right.parent= null;
				this.right = null;
				break;
			default:
				throw new Error("removeChild");
		}
		
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			let par = this.parent;
			//update left right child
			if (this.left) this.left.parent = par;
			if (this.right) this.right.parent = par;

			// update this.parent.parent
			if (par.parent) {
				if (par.parent.left === par) {
					par.parent.left = this;
				} else {
					par.parent.right = this;
				}
			}
			// swap node with parent
			if (par.left === this) {
				if (par.right) par.right.parent = this;
				[par.left, par.right, par.parent, this.left, this.right, this.parent] =
				[this.left, this.right, this, this.parent, par.right, par.parent];
			} else {
				par.left.parent = this;
				[par.left, par.right, par.parent, this.left, this.right, this.parent] =
				[this.left, this.right, this, par.left, this.parent, par.parent];
			}
		}
	}
}

module.exports = Node;
