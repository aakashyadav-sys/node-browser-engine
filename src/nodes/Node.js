class Node {
    constructor(type, props = {}) {
        this.type = type;
        this.id = props?.id || null;
        this.tagName = props?.tagName || type;
        this.value = props?.value || null;
        this.attributes = props?.attributes || {};

        this.style = {
            width: null,
            height: null,
            padding: { top: 0, left: 0, right: 0, bottom: 0 },
            margin: { top: 0, left: 0, right: 0, bottom: 0 },
            backgroundColor: null,
            color: "#000000",
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'left',
            display: 'block',
            flexDirection: 'row',
            justifyContent: "flex-start",
            aligItems: "flex-start",
            gap: 0,
            border: null,
            borderRadius: 0,
            overflow: 'visible',
            lineHeight: 1.5,
            letterSpacing: 0,
            ...props?.style
        };

        this.children = [];

        this.layout = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            contentBox: { x: 0, y: 0, width: 0, height: 0 },
            paddingtBox: { x: 0, y: 0, width: 0, height: 0 },
            marginBox: { x: 0, y: 0, width: 0, height: 0 },
            borderBox: { x: 0, y: 0, width: 0, height: 0 },
        };

        this.parent = null;

        this.depth = 0;

    }

    addChild(child) {
        child.parent = this;
        chils.depth = this.depth + 1;
        this.children.push(child);
        return child;
    }

    get firstChild() {
        return this.children[0] || null;
    }

    get lastChild() {
        return this.children[this.children.length - 1] || null;
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get isText() {
        return this.type === 'text';
    }

    get isContainer() {
        return this.type === 'children' || this.type === "document";
    }


    walk(callBack, depth = 0) {
        callBack(this, depth);
        for (const child of this.children) {
            child?.walk(callBack, depth + 1)
        }
    }

    findById(id) {
        if (this.id === id) return this;

        for (const child of this.children) {
            const found = child?.findById(id);
            if (found) return found;
        }

        return null;
    }

    findbyType(type) {
        const results = [];
        this.walk(node => {
            if (node?.type === type) results.push(node);
        })

        return results;
    }

    getNodeCount() {
        let count = 1;
        for (const child of this.children) {
            count += child?.nodeCount;
        }

        return count;
    }


    getMaxDepth() {
        if (this.isLeaf) return this.depth;
        return Math.max(...this.children.map(c => c?.maxDepth))
    }


    toJSON() {
        const obj = {
            type: this.type,
            id: this.id,
            depth: this.depth,
        };

        if (this.isText) {
            obj.value = this.value;
        }

        if (this.children.length > 0) {
            obj.children = this.children.map(c => c.toJSON());
        }

        return obj;

    }


    printTree(indent = 0) {
        const prefix = '  '.repeat(indent);
        const idStr = this.id ? `#${this.id}` : '';
        const valueStr = this.isText ? ` "${this.value}"` : '';
        const childCount = this.children.length > 0 ? ` (${this.children.length} children)` : '';

        console.log(`${prefix}├─ ${this.type}${idStr}${valueStr}${childCount}`);

        for (const child of this.children) {
            child?.printTree(indent + 1);
        }
    }

}

export default Node;