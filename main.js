// const graph = require('./graph.js')
// const Lollipop = require('./lollipop.js')
let lol;
let paths;
let index = 0;
let chords;
let nodes;

//Create a variable to decide if the start experiemnt button has been clicked
let exp_decide = false;

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
    chords = parseInt(chord_field.value);

    const node_field = document.getElementById('node-input');
    nodes = parseInt(node_field.value);

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
    nodes = parseInt(node_field.value);

    //set chords to equal random so can be used later on.
    chords = "Random";

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
    document.getElementById("ham-path").classList.remove("hidden");

    const curr_path = document.getElementById("ham-path");

    //Create a finish button which will automatically take you to the last step of the Algorithm
    document.getElementById("finish").classList.remove("hidden");
    document.getElementById("restart").classList.remove("hidden");
    curr_path.innerHTML = paths[index].join(", ");

    document.getElementById("finish").onclick = finished;

    //Create path to function for restarting.
    document.getElementById("restart").onclick = restarting;
    
    //Check whether to bring the start button back
    if(!exp_decide){
        document.getElementById("exp-start").classList.remove("hidden");
    }

    document.getElementById("exp-start").onclick = experiments;

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
        document.getElementById("ham-path").classList.add("hidden");
        document.getElementById("next_button").classList.add("hidden");
        document.getElementById("back_button").classList.add("hidden");
        document.getElementById("details").classList.add("hidden");
        document.getElementById("exp-start").classList.add("hidden");

        //Bring back the buttons from the start page
        document.getElementById("own-input").classList.remove("hidden");
        document.getElementById("random-input").classList.remove("hidden");

        //clear canvas
        d3.selectAll('svg').remove();
    }

    //Function for creating the table (the start of in here will have buttons to check what to be done)
    function experiments(){
        exp_decide = true;
        document.getElementById("exp-start").classList.add("hidden");
        document.getElementById("adding-exp").classList.remove("hidden");
        document.getElementById("restarting-exp").classList.remove("hidden");

        document.getElementById("table").classList.remove("hidden");

        document.getElementById("adding-exp").onclick = add_exp;
        document.getElementById("restarting-exp").onclick = restart_exp;

        

        //function to add experiment to the table.
        function add_exp(){ 

            let info = [nodes, chords, paths.length, Math.floor(Math.log2(paths.length))];

            console.log(info)

            const tr = document.getElementById("results").insertRow();

            for(let i = 0; i < 4; i++){
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(info[i]));
            }

            //Use javascrip to add a class to table element so then can change the colour of it depending on fast level
            if(info[3] <= 5){
                tr.classList.add("green");
            }
            else if(info[3] <= 10){
                tr.classList.add("yellow");
            }
            else if(info[3] <= 15){
                tr.classList.add("orange");
            }
            else{
                tr.classList.add("red");
            }
        }

        //Create a function which will restart the expereiments, bring back start experiments and reset the table
        function restart_exp(){

            //firstly will need to remove the rows that arent needed
            let table = document.getElementById("results");
            let row_count = table.rows.length;

            for(let i = 1; i < row_count; i++){
                document.getElementById("results").deleteRow(1);
            }

            //remove buttons by hidding them
            document.getElementById("adding-exp").classList.add("hidden");
            document.getElementById("restarting-exp").classList.add("hidden");           

            //now make the table hidden
            document.getElementById("table").classList.add("hidden");

            //bring back the start experiment button and set exp_start = false;
            document.getElementById("exp-start").classList.remove("hidden");
            exp_decide = false;
        }

    }

}

