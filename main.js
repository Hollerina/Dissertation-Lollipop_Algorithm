// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
try{
    const g = graph(60, 15);
    console.log(g)

    const lol = new Lollipop(g)
    window.onresize = () => {
        lol.print_graph()
    }
    lol.print_graph();
    paths = lol.execution(0);

    //Now have each path need event listeners to see when a button is clicked to see if it go or not
    
}
catch(e){
    console.log("ERROR: " + e)
}
