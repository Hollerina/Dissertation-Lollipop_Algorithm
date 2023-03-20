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
    paths = lol.execution(0);

}
catch(e){
    console.log("ERROR: " + e)
}

//create an index to loop through 
let index = 0;

//Now have each path need event listeners to see when a button is clicked to see if it go or not
document.getElementById("start").onclick = initial_path_finding;

function initial_path_finding(){
    //This function wil begin the process of starting cycle.
    //need to pass to print_graph the current Hamiltonian path which will be highlighted red

    document.getElementById("start").remove();
    const back = document.createElement("button");
    back.className = "back_button";
    back.id = "back_button"
    back.innerHTML = "BACK";
    document.getElementById("controls").appendChild(back);

    const next = document.createElement("button");
    next.className = "next_button";
    next.id = "next_button"
    next.innerHTML = "NEXT";
    document.getElementById("controls").appendChild(next);

        
    document.getElementById("next_button").onclick = next_path_finding;
    document.getElementById("back_button").onclick = back_path_finding;

    function next_path_finding(){
        index++;
        console.log(index)
        
    }

    function back_path_finding(){
        //do an if if below 0
        index--;
        console.log(index)
    }

}

