const graph = require('./graph.js')
const Lollipop = require('./lollipop.js')
try{
    const g = graph(12, 5);
    console.log(g)

    const lol = new Lollipop(g)
    lol.execution(0)
}
catch(e){
    console.log("ERROR: " + e)
}
