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
}




