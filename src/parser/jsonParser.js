import Node from "../nodes/Node.js"

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
            style: this.normalizeStyles(data.style || {})
        })

        node.depth = depth;
        node.parent = parent;
        this.nodeCount++;

        //parse children
        if (data?.children && Array.isArray(data?.children)) {
            for (const childData of data?.children) {
                if (typeof childData === 'string') {
                    const textNode = new Node('text', {
                        value: childData,
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


    determineNodeType(data) {
        if (data?.type) {
            return data?.type;
        }

        if ((data?.value || data?.text) && !data?.children) {
            return text;
        }

        if (data?.children && data?.children?.length > 0) {
            return 'container';
        }

        return container;
    }


    normalizeStyles(style) {
        const normalized = { ...style };

        // normalize padding
        if (typeof style.padding === "number") {
            normalized.padding = {
                top: style.padding,
                right: style.right,
                bottom: style.bottom,
                left: style.left,
            }
        } else if (Array.isArray(style.padding)) {
            const [top, right = top, bottom = top, left = right] = style?.padding;
            normalized.padding = { top, right, bottom, left };
        } else if (typeof style.padding === 'object') {
            normalized.padding = {
                top: style.padding.top || 0,
                right: style.padding.right || 0,
                bottom: style.padding.bottom || 0,
                left: style.padding.left || 0,
            }
        } else {
            normalized.padding = { top: 0, right: 0, bottom: 0, left: 0 }
        }
        // normalize margin
        if (typeof style.margin === 'number') {
            normalized.margin = {
                top: style.margin,
                right: style.right,
                bottom: style.bottom,
                left: style.left,
            }
        } else if (Array.isArray(style?.margin)) {
            const [top, right = top, bottom = top, left = right] = style?.margin;
            normalized.margin = { top, right, bottom, left }
        } else if (typeof style.margin === 'object') {
            normalized.margin = {
                top: style.margin.top || 0,
                right: style.margin.right || 0,
                bottom: style.margin.bottom || 0,
                left: style.margin.left || 0,
            }
        } else {
            normalized.margin = { top: 0, right: 0, bottom: 0, left: 0 }
        }

        // border 
        if (typeof style.border === "string") {
            normalized.border = {
                width: 1,
                color: style.border,
                style: "solid",
            }
        } else if (typeof style.border === "object") {
            normalized.border = {
                width: style.border.width || 0,
                color: style.border.color || 0,
                style: style.border.style || "solid",

            }
        } else if (typeof style.border === "number") {
            normalized.border = {
                width: style.border,
                color: "#000000",
                style: "solid"
            }
        }

        return normalized;
    }
}



export default JosnParser;
