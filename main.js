// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
let lol;
let paths;
let index = 0;

//Get user input of what the chord size will be
document.getElementById('submit').onclick = () => {
    const chord_field = document.getElementById('chord-input');
    const chords = parseInt(chord_field.value);

    const node_field = document.getElementById('node-input');
    const nodes = parseInt(node_field.value);

    //remove both fields and just keep inputs
    document.getElementById('inputs').classList.add('hidden');

    //Create p elements to display the text
    const newP = document.createElement('p');
    newP.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`;
    // document.getElementById

    const detailsDiv = document.createElement('p');

    detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`
    document.getElementById("details").appendChild(detailsDiv);

    //Bring back start button
    document.getElementById("start").classList.remove('hidden');

    console.log(`Creating graph with nodes ${nodes} and chords ${chords}`)
    const g = graph(16, 4);

    lol = new Lollipop(g)

    paths = lol.execution(0);
    lol.print_graph(paths[0] , true);

    window.onresize = () => {
        lol.print_graph(paths[0] , true)
    }

    try{

    
    }
    catch(e){
        alert(`ERROR: ${e}`)
    }
}


//Now have each path need event listeners to see when a button is clicked to see if it go or not
document.getElementById("start").onclick = initial_path_finding;

function initial_path_finding(){
    window.onresize = () => {
        lol.print_graph(paths[index])
    }
    //This function wil begin the process of starting cycle.
    //need to pass to print_graph the current Hamiltonian path which will be highlighted red

    lol.print_graph(paths[index])

    //Once the simulation is began remove the start button , want to create finish button too

    document.getElementById("start").remove();
    const back = document.createElement("button");
    back.className = "button back_button";
    back.id = "back_button"
    back.innerHTML = "BACK";
    document.getElementById("control-buttons").appendChild(back);

    const next = document.createElement("button");
    next.className = "button next_button";
    next.id = "next_button"
    next.innerHTML = "NEXT";
    document.getElementById("control-buttons").appendChild(next);

        
    document.getElementById("next_button").onclick = next_path_finding;
    document.getElementById("back_button").onclick = back_path_finding;

    const curr_path = document.getElementById("ham-path");

    function next_path_finding(){
        //pass the next Hamiltonian cycle in if the next button is pressed
        if(index < paths.length - 1){
            index++;
            lol.print_graph(paths[index]);
        }
        else{
            lol.print_graph(paths[paths.length - 1]);
        }

        curr_path.innerHTML = paths[index];
        
    }

    function back_path_finding(){
    //go back a step to previous hamitlonian path if this is pressed
        //do an if if below 0
        if(index > 0){
            index--;
            lol.print_graph(paths[index])
        }
        console.log(index)
        curr_path.innerHTML = paths[index];
    }

}

