import jsonParser from "./parser/jsonParser.js"
import Logger from "./utils/logger.js"
import fs from "node:fs"

class RenderEnigne {
    constructor(options = {}) {
        this.logger = new Logger(options?.verbose || false);
        this.parser = new jsonParser();
        this.rootNode = null;
    }

    loadJson(json) {
        this.logger.phase("LOADING");
        let data = json;

        if (typeof json === 'string') {
            const filePath = json;
            data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            this.logger.info(`Loaded from  file  :  ${filePath}`)
        }

        return data;
    }

    parseJsonIntoNodeTree(json) {
        this.logger.phase("PARSING");
        this.rootNode = this.parser.parse(json);
        this.logger.success('Node tree created');
        return this.rootNode;
    }

    getStatusOfNodeTree() {
        if (!this.rootNode) return null;

        const typeCounts = {};
        this.rootNode.walk(node => typeCounts[node?.type] = (typeCounts[node?.type] || 0) + 1);
        return {
            totalNodes: this.rootNode.getNodeCount,
            maxDepth: this.rootNode.getMaxDepth,
            typeBreakDown: typeCounts,
        }
    }

    printTree() {
        if (!this.rootNode) {
            console.log("No tree tp print . Call parse()  first.")
            return;
        }
        console.log('\n🌳 Node Tree:');
        this.rootNode.printTree();
    }
}



export default RenderEnigne;