// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
try{
    const g = graph(12, 3);
    console.log(g)

    const lol = new Lollipop(g)
    window.onresize = () => {
        lol.print_graph()
    }
    lol.print_graph();
    lol.execution(0)
}
catch(e){
    console.log("ERROR: " + e)
}
