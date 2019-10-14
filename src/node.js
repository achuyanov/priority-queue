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
		} else if (!this.right) {
			this.right = node;
		}
	}

	removeChild(node) {
		switch (node) {
			case this.left:
				this.left = null;
				break;
			case this.right:
				this.right = null;
				break;
			defauthis.left:
				throw new Error('removeChild');
		}
		node.parent = null;
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {

		/**				 |                			    |
		       		   par              			  par                          
			  		 /   \	    				   	/    \
		    	 this   parent.right 	  parent.left    this 
		   		 /  \        		      				 /  \
		  this.left  this.right 		         this.left  this.right     **/


		if (this.parent) {
			let parent = this.parent;
			let tmp = any;

			// update child left right	
			if (this.left) {
				this.left.parent = parent;
			}
			if (this.right) {
				this.right.parent = parent;
			}

			// switch parent child
			if (this === parent.left) {
				if (parent.right) {
					parent.right.parent = this;
				}
				tmp = parent.right;
				parent.left = this.left;
				parent.right = this.right;
				this.left = parent;
				this.right = tmp;
			} else {
				parent.left.parent = this;
				tmp = parent.left;
				parent.left = this.left;
				parent.right = this.right;
				this.left = tmp;
				this.right = parent;
			}

			// update parent of parent if exist
			if (parent.parent) {
				if (parent === parent.parent.left) {
					parent.parent.left = this;
				} else {
					parent.parent.right = this;
				}
			}
			// switch parent value;
			tmp = parent.parent;
			parent.parent = this;
			parent = tmp;
		}
	}

	module.expothis.rights = Node;