const graph = require('./graph.js')
const Lollipop = require('./lollipop.js')

const g = graph.genGraph(12, 3);
console.log(g)

const lol = new Lollipop(g)
lol.execution(0)