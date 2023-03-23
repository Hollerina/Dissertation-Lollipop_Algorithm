// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
let lol;
let paths;
let index = 0;

//need to display correct things depending on which button was clickecd orginally
document.getElementById("own-input").onclick = own_values;
document.getElementById("random-input").onclick = random_values;

function own_values(){
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("inputs").classList.remove("hidden");
}

function random_values(){
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("random").classList.remove("hidden");
}

document.getElementById("submit").onclick = begin_algorithm;
document.getElementById("random-button").onclick = begin_algorithm;

//Get user input of what the chord size will be CHANGE TO FUNCTION RATHER THAN ARROW FUNCTION
function begin_algorithm(){
    const chord_field = document.getElementById('chord-input');
    const chords = parseInt(chord_field.value);

    const node_field = document.getElementById('node-input');
    const nodes = parseInt(node_field.value);

    //remove both fields and just keep inputs
    document.getElementById('inputs').classList.add('hidden');
    document.getElementById("random").classList.add("hidden");

    //Create p elements to display the text
    const newP = document.createElement('p');
    newP.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`;
    // document.getElementById

    const detailsDiv = document.createElement('p');
    detailsDiv.id ="info";
    detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`
    document.getElementById("details").appendChild(detailsDiv);

    //Bring back start button
    document.getElementById("start").classList.remove('hidden');
    document.getElementById("random-button").classList.add("hidden");
    console.log(`Creating graph with nodes ${nodes} and chords ${chords}`)


    try{
        const g = graph(nodes, chords);

        lol = new Lollipop(g)
    
        paths = lol.execution(0);
        lol.print_graph(paths[0] , true);
    
        window.onresize = () => {
            lol.print_graph(paths[0] , true)
        }
    
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

    document.getElementById("start").classList.add("hidden");
    
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

    //Create a finish button which will automatically take you to the last step of the Algorithm
    document.getElementById("finish").classList.remove("hidden")
    curr_path.innerHTML = paths[index];

    document.getElementById("finish").onclick = finished;

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

    function finished(){
        index = paths.length - 1;
        lol.print_graph(paths[index]);
        curr_path.innerHTML = paths[index]
    }

}

