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
document.getElementById("random-button").onclick = random_begin_algorithm;

//Get user input of what the chord size will be CHANGE TO FUNCTION RATHER THAN ARROW FUNCTION
//This will be for submit
function begin_algorithm(){

    const chord_field = document.getElementById('chord-input');
    const chords = parseInt(chord_field.value);

    const node_field = document.getElementById('node-input');
    const nodes = parseInt(node_field.value);

    //intialise error so can use to validate an input
    let error = "";

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
        error = e;
        alert(`ERROR: ${e}`)
    }

    console.log(error);
    console.log("This is the val: " + document.getElementById("chord-input").value)

    if(error.length == 0){
        //remove both fields and just keep inputs
        document.getElementById('inputs').classList.add('hidden');
        document.getElementById("random").classList.add("hidden");


        document.getElementById("details").classList.remove("hidden");
        let detailsDiv = document.getElementById("info");
        detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`;

        //Bring back start button
        document.getElementById("start").classList.remove('hidden');
        console.log(`Creating graph with nodes ${nodes} and chords ${chords}`)
    }
}

//Create a function for when it is random as will need to randomly select the edges
function random_begin_algorithm(){
    const node_field = document.getElementById('random-node-input');
    const nodes = parseInt(node_field.value);

    //Remove hidden class from details 
    document.getElementById("details").classList.remove("hidden");
    let detailsDiv = document.getElementById("info");
    detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: Random`

    //remove and add start
    document.getElementById("random").classList.add("hidden");
    document.getElementById("start").classList.remove('hidden');


    //intialise error so can use to validate an input
    let error = "";

    try{
        const g = graph(nodes, 0, true);

        lol = new Lollipop(g)
    
        paths = lol.execution(0);
        lol.print_graph(paths[0] , true);
    
        window.onresize = () => {
            lol.print_graph(paths[0] , true)
        }
    
    }
    catch(e){
        error = e;
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

    //get next and back buttons.
    document.getElementById("next_button").classList.remove("hidden");
    document.getElementById("back_button").classList.remove("hidden");
        
    document.getElementById("next_button").onclick = next_path_finding;
    document.getElementById("back_button").onclick = back_path_finding;

    const curr_path = document.getElementById("ham-path");

    //Create a finish button which will automatically take you to the last step of the Algorithm
    document.getElementById("finish").classList.remove("hidden");
    document.getElementById("restart").classList.remove("hidden");
    curr_path.innerHTML = paths[index];

    document.getElementById("finish").onclick = finished;

    //Create path to function for restarting.
    document.getElementById("restart").onclick = restarting;

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

    function restarting(){
        //This function will take back to the original format of the page to start a new experiment with the algorithm.

        //Remove everything currently on the page.
        document.getElementById("restart").classList.add("hidden");
        document.getElementById("finish").classList.add("hidden");
        document.getElementById("current-path").classList.add("hidden");
        document.getElementById("next_button").classList.add("hidden");
        document.getElementById("back_button").classList.add("hidden");
        document.getElementById("details").classList.add("hidden");

        //Bring back the buttons from the start page
        document.getElementById("own-input").classList.remove("hidden");
        document.getElementById("random-input").classList.remove("hidden");
    }

}

