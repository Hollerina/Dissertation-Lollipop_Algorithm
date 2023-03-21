// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
let lol;
let paths;
try{
    const g = graph(12, 3);

    lol = new Lollipop(g)

    paths = lol.execution(0);
    lol.print_graph(paths[0] , true);

    window.onresize = () => {
        lol.print_graph(paths[0] , true)
    }

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

    lol.print_graph(paths[index])

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
        //pass the next Hamiltonian cycle in if the next button is pressed
        index++;
        lol.print_graph(paths[index])
        
    }

    function back_path_finding(){
    //go back a step to previous hamitlonian path if this is pressed
        //do an if if below 0
        index--;
        lol.print_graph(paths[index])
    }

}

