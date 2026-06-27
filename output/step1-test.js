import RenderEnigne from "../src/index.js";
import Node from "../src/nodes/Node.js";
import fs from "node:fs";


console.log('╔══════════════════════════════════════════════════╗');
console.log('║     BROWSER RENDER ENGINE - STEP 1 TEST         ║');
console.log('║           Node Tree Parser                      ║');
console.log('╚══════════════════════════════════════════════════╝\n');


// create the engine
const engine = new RenderEnigne({ verbose: true });

// load the sample file json
const samplePath = "../samples/sample1.json";
const json = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

// parse the json
console.log("Test 1 :  parse json into  Node tree");
console.log("-".repeat(40));
const tree = engine.parseJsonIntoNodeTree(json);
console.log('Parse compeleted');

//print tree
console.log('Test 2  :  Print Node Tree');
console.log('-'.repeat(40));
engine.printTree();


// get the statictics
console.log("Test 3  : get the statics count of the json tree")
console.log('-'.repeat(40));
const stats = engine.getStatusOfNodeTree();
console.log('Total nodes', stats.totalNodes);
console.log('Max Depth', stats.maxDepth);
console.log('Type BreakDown', stats.typeBreakDown);

// find by id
console.log('Test  4 : find node by Id')
console.log('-'.repeat(40));
const header = tree.findById('header');
if (header) {
    console.log('Found Header', header?.type);
    console.log('Bg color', header?.style?.backgroundColor);
    console.log('Children count', header?.children?.length)
}

// find by type
console.log('Test 5 :  Find all text nodes');
console.log('-'.repeat(40));
const textNodes = tree.findbyType('text');
console.log(`Found ${textNodes.length}  text nodes`);
textNodes.forEach((node, i) => {
    console.log(`${i + 1}.  "${node?.value}" (depth  :  ${node?.depth}) `);
})


// walk and collect
console.log('Test 6 :  Custom tree walk');
console.log('-'.repeat(40));
const containersPadding = [];
tree.walk((node) => {
    if (node?.style?.padding && (node?.style?.top > 0 || node?.style?.padding?.lefy > 0)) {
        containersPadding.push({
            id: node?.id || '(anoyomous)',
            padding: node?.style?.padding
        })
    }
})
console.log('Containers with padding');
containersPadding.forEach(c => {
    console.log(`${c?.id}:`, c?.padding);
})

// text shortHand text parsing
console.log('Test  7 :  ShortHand Text parsing');
console.log('-'.repeat(40));
const simpleJson = {
    type: 'container',
    children: [
        "hello world",
        "this is shortHand text"
    ]
}
const simpleTree = engine.parseJsonIntoNodeTree(simpleJson);
console.log('Shorthand children parsed as text nodes:');
simpleTree.children.forEach(c => {
    console.log(`  type: ${c.type}, value: "${c.value}"`);
});

console.log('\n╔══════════════════════════════════════════════════╗');
console.log('║           STEP 1 COMPLETED! ✅                  ║');
console.log('║                                                  ║');
console.log('║  Next: Step 2 - Layout Engine (Box Model)       ║');
console.log('╚══════════════════════════════════════════════════╝');



