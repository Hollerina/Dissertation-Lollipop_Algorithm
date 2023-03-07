const graph = require('./graph.js')
const Lollipop = require('./lollipop.js')

const g = graph(50, 5);
console.log(g)

const lol = new Lollipop(g)
lol.execution(0)