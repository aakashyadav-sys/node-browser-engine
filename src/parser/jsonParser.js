import Node from "../nodes/Node"

class JosnParser {
    constructor() {
        this.nodeCount = 0;
    }

    /**
     * parse JSON input  into Node Tree
     * @param {Object|string}  json -  Json Object or string
     * @returns {Node}  Root Node of the tree
     */

    parse(json) {
        this.nodeCount = 0;
        let data = json;
        if (typeof json === 'string') {
            data = JSON.parse(json);
        }

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid Json : excepted an object');
        }

        const rootNode = this.parseNode(data, null, 0);

        console.log(`Parsed ${this.nodeCount}  nodes`)

        return rootNode;
    }

    //Recursively  parse a json node

    parseNode(data, parent, depth) {
        if (!data || typeof data !== 'object') {
            throw new Error(`Invalid  ndoe at depth ${depth}: ${JSON.stringify(dat)}`)
        }

        const type = this.determineNodeType(data);

        // create the node 
        const node = new Node(type, {
            id: data?.id || null,
            tagName: data?.tagName || data?.type || type,
            value: data?.value || data?.text || null,
            attributes: data?.attributes || {},
            style: this.normalizeStyle(data?.style || {})
        })

        node.depth = depth;
        node.parent = parent;
        this.nodeCount++;

        //parse children
        if (data?.children && Array.isArray(data?.children)) {
            for (const childData of data?.children) {
                if (typeof childData === 'string') {
                    const textNode = new Node('text', {
                        value: children,
                        style: { fontSize: node.style?.fontSize, color: node.style?.color }
                    })
                    textNode.depth = depth + 1;
                    textNode.parent = node;
                    this.nodeCount++;
                    node.children.push(textNode);
                } else {
                    const childNode = this.parseNode(childData, node, depth + 1);
                    node.children.push(childNode);
                }
            }
        }

        return node;

    }

    
}




