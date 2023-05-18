

/**
 * Main Method:
 * 
 * In the main Method a variety of actions take place:
 *  
 *      1)Create a lollipop object to call the two methods execute and print graph.
 *      2)Onlick to see when buttons are pressed and then direct them to the correct functions and actions needed.
 */
let lol;
let paths;
let index = 0;
let chords;
let nodes;
let exp_decide = false;

//Calling functions depending whether own-input or random-input was clicked.
document.getElementById("own-input").onclick = own_values;
document.getElementById("random-input").onclick = random_values;
document.getElementById("normal-tests").onclick = experiment_set;
document.getElementById("random-tests").onclick = random_exp;

/**
 * own_values:
 * 
 * Will remove the orginal buttons displayed on the screen and bring the "inputs" set of buttons.
 */
function own_values(){
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("normal-tests").classList.add("hidden");
    document.getElementById("random-tests").classList.add("hidden");
    document.getElementById("inputs").classList.remove("hidden");
}

/**
 * random_values:
 * 
 * Will remove the orginal buttons displayed on the screen and bring the "random" set of buttons.
 */
function random_values(){
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("normal-tests").classList.add("hidden");
    document.getElementById("random-tests").classList.add("hidden");
    document.getElementById("random").classList.remove("hidden");
}

//point to correct functions depening on the onclick
document.getElementById("submit").onclick = begin_algorithm;
document.getElementById("random-button").onclick = random_begin_algorithm;

/**
 * begin_algorithm:
 * 
 * This function is called when the user selects own-input at the inital stage.
 * Here is a list of things this functions does:
 * 
 *      1)Set control display to the next stage.
 *      2)Create a lollipop object.
 *      3)Use the object to call execution which will return an array of the paths.
 *      4)Print(display) the graph with no Hamiltonian paths present.
 */
function begin_algorithm(){
    
    //getting the user input for chord size and node size.
    const chord_field = document.getElementById('chord-input');
    chords = parseInt(chord_field.value);

    const node_field = document.getElementById('node-input');
    nodes = parseInt(node_field.value);

    //intialise error so can use to validate an input.
    let error = "";

    //An error can be thrown from the graph as user my have invalid input. In this case alert used to display this.
    try{
        const g = graph(nodes, chords);

        
        lol = new Lollipop(g)
        console.log(lol);
        paths = lol.execution(0);
        console.log(paths);
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

    //If there is no error then can proceed to bringing next set of controls up.
    if(error.length == 0){
        //remove both fields and just keep inputs
        document.getElementById('inputs').classList.add('hidden');
        document.getElementById("random").classList.add("hidden");

        document.getElementById("details").classList.remove("hidden");
        let detailsDiv = document.getElementById("info");
        detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: ${chords}`;

        //Bring back start button
        document.getElementById("start").classList.remove('hidden');
        document.getElementById("control-buttons").classList.remove("hidden");
        console.log(`Creating graph with nodes ${nodes} and chords ${chords}`)
    }
}

/**
 * random_begin_algorithm:
 * 
 * This function is called when the user selects random-input at the inital stage.
 * Here is a list of things this functions does:
 * 
 *      1)Set control display to the next stage.
 *      2)Create a lollipop object.
 *      3)Use the object to call execution which will return an array of the paths.
 *      4)Print(display) the graph with no Hamiltonian paths present.
 */
function random_begin_algorithm(){
    const node_field = document.getElementById('random-node-input');
    nodes = parseInt(node_field.value);

    //set chords to equal random so can be used later on.
    chords = "Random";

 


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
    console.log(error);
    
    if(error.length == 0){
        //remove both fields and just keep inputs
        document.getElementById('inputs').classList.add('hidden');
        document.getElementById("random").classList.add("hidden");

        //Remove hidden class from details.
        document.getElementById("details").classList.remove("hidden");
        let detailsDiv = document.getElementById("info");
        detailsDiv.innerHTML = `Node size: ${nodes}  Chord size: Random`

        //remove and add start
        document.getElementById("random").classList.add("hidden");
        document.getElementById("control-buttons").classList.remove("hidden");
        document.getElementById("start").classList.remove('hidden');
    }

}

//At this stage the array of the paths that the algorithm uses has already been created. User is presented with a start button no matter the inital selection. 
document.getElementById("start").onclick = initial_path_finding;

/**
 * initial_path_finding:
 * 
 * This function is where the step by step of the algorithm occurs.
 * Here is a list of things that the function does:
 * 
 *      1)Create the next set on control buttons.
 *      2)Functions next and backwards to walk through the path array.
 *      3)Finish button which will take to the last element in the path array.
 *      4)Restarting which will allow user to go to next experiment.
 *      5)Experiments will allow user to add to the experiment table.
 */
function initial_path_finding(){
    window.onresize = () => {
        lol.print_graph(paths[index])
    }

    //Will print the graph at the current index
    lol.print_graph(paths[index])

    //Remove the start button
    document.getElementById("start").classList.add("hidden");

    //get next and back buttons.
    document.getElementById("next_button").classList.remove("hidden");
    document.getElementById("back_button").classList.remove("hidden");
    
    //Point to functions for when buttons are pressed
    document.getElementById("next_button").onclick = next_path_finding;
    document.getElementById("back_button").onclick = back_path_finding;

    //bring Ham-path element back to display to the user what the current path is.
    document.getElementById("current-path").classList.remove("hidden");
    const curr_path = document.getElementById("current-path");
    if(paths[index].length <= 100){
        curr_path.innerHTML = paths[index].join(", ");
    }
    

    //Create a finish button which will automatically take you to the last step of the Algorithm
    document.getElementById("finish-button").classList.remove("hidden");

    document.getElementById("finish").onclick = finished;

    //Create path to function for restarting.
    document.getElementById("restart").onclick = restarting;
    
    //Check whether to bring the experiment button back. If an experiment set already in place then don't want to bring the experiment start button back.
    if(!exp_decide){
        document.getElementById("exp-start").classList.remove("hidden");
        document.getElementById("experiment-buttons").classList.remove("hidden");
    }
    else{
        document.getElementById("experiment-buttons").classList.remove("hidden");
    }

    document.getElementById("exp-start").onclick = experiments;

    /**
     * next_path_finding:
     * 
     * This function main purpose is to display the next step in the algorithm
     */
    function next_path_finding(){
        //pass the next Hamiltonian cycle in if the next button is pressed
        if(index < paths.length - 1){
            index++;
            lol.print_graph(paths[index]);
        }
        else{
            lol.print_graph(paths[paths.length - 1]);
        }

        if(paths[index].length <= 100){
            curr_path.innerHTML = paths[index];
        }
        
        
    }

    /**
     * back_path_finding:
     * 
     * This function main purpose is to display the back step in the algorithm.
     */
    function back_path_finding(){
    //go back a step to previous hamitlonian path if this is pressed
        //do an if if below 0
        if(index > 0){
            index--;
            lol.print_graph(paths[index])
        }
        
        if(paths[index].length <= 100){
            curr_path.innerHTML = paths[index];
        }
        
    }

    /**
     * finished:
     * 
     * Send user to last step in the algorithm
     */
    function finished(){
        index = paths.length - 1;
        lol.print_graph(paths[index]);
        if(paths[index] <= 100){
            curr_path.innerHTML = paths[index];
        }
        
    }

    /**
     * restarting:
     * 
     * This function allows for the user to start a new experiment.
     */
    function restarting(){
        //This function will take back to the original format of the page to start a new experiment with the algorithm.

        //Remove everything currently on the page.
        document.getElementById("finish-button").classList.add("hidden");
        document.getElementById("control-buttons").classList.add("hidden");
        document.getElementById("current-path").classList.add("hidden");
        document.getElementById("next_button").classList.add("hidden");
        document.getElementById("back_button").classList.add("hidden");
        document.getElementById("details").classList.add("hidden");
        document.getElementById("exp-start").classList.add("hidden");
        document.getElementById("experiment-buttons").classList.add("hidden");
        document.getElementById("normal-tests").classList.add("hidden");
        document.getElementById("random-tests").classList.add("hidden");

        //Bring back the buttons from the start page
        document.getElementById("own-input").classList.remove("hidden");
        document.getElementById("random-input").classList.remove("hidden");
        document.getElementById("normal-tests").classList.remove("hidden");
        document.getElementById("random-tests").classList.remove("hidden");


        //clear canvas
        d3.selectAll('svg').remove();

        //reset the index 
        index = 0;
    }

    /**
     * experiments:
     * 
     * This function will create a table to displaye the experiments
     */
    function experiments(){
        exp_decide = true;
        document.getElementById("experiment-buttons").classList.remove("hidden");
        document.getElementById("exp-start").classList.add("hidden");
        document.getElementById("adding-exp").classList.remove("hidden");
        document.getElementById("restarting-exp").classList.remove("hidden");
        

        document.getElementById("table").classList.remove("hidden");

        document.getElementById("adding-exp").onclick = add_exp;
        document.getElementById("restarting-exp").onclick = restart_exp;

        /**
         * add_exp:
         * 
         * This function is to add an experiment to the table
         */
        function add_exp(){ 

            let info = [nodes, chords, paths.length - 2, Math.floor(Math.log2(paths.length - 2))];

            const tr = document.getElementById("results").insertRow();

            for(let i = 0; i < 4; i++){
                const td = tr.insertCell();
                td.classList.add("tr-single");
                td.appendChild(document.createTextNode(info[i]));
            }

            //Use javascript to add a class to table element so then can change the colour of it depending on fast level
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

        /**
         * restart_exp:
         * 
         * This function will allow for the user to reset the experiments that have already been conducted by wiping the entire table
         */
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

//Function that will run a set of experiments on normal graphs
function experiment_set(){

    //HOLLY HAVE A RETHINK OF THE NODE STEP THING AS DOESNT WORK ALWAYS ? MAYBE IT REALISTICALLY COULD JUST LOOP THROUGH THE ODDS FROM 3 I THINK THAT COULD WORK

    //remove the old buttons
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("normal-tests").classList.add("hidden");
    document.getElementById("random-tests").classList.add("hidden");

    //Bring in the beggining of the table within the graph box
    document.getElementById("experiment").classList.remove("hidden");
    document.getElementById("restarter").classList.remove("hidden");

    //need to call for user input therefore remove hidden
    document.getElementById("regular-experiment").classList.remove("hidden");

    //Onclick direction for submit
    document.getElementById("exp-submit").onclick = reg_exp;

    //Onclick for restarting
    document.getElementById("exp-restart").onclick = restart;

    function reg_exp(){
        //get the values that user entered
        const node_start = document.getElementById('regular-exp-start-input');
        exp_node_start = parseInt(node_start.value);
        const node_end = document.getElementById("regular-exp-end-input");
        exp_node_end = parseInt(node_end.value);
        const node_step = document.getElementById("regular-exp-step-input");
        exp_node_step = parseInt(node_step.value);

        const headerRow = document.getElementById("header");

        let columnIndex = 0;

        //looping through each iteration of adding to the table element
        //Will need to call lollipop on each one.
        for(let i = exp_node_start; i <= exp_node_end; i += exp_node_step, columnIndex += 1){
            // Create the headers
            const tr = document.getElementById("experiment").insertRow();
            tr.id = `r${columnIndex}`;
            tr.insertCell().outerHTML = `<th scope="row" class="table-heading-row">${i}</th>`;
            
            //Fill row in for that i
            for(let j = exp_node_start; j < i; j += (exp_node_step*2)){
                let step_row = get_info(i, j/exp_node_step);
                let td_1 = tr.insertCell();
                td_1.classList.add(colour_gen(step_row));
                td_1.classList.add("no-marg");
                console.log("step_row ",step_row ,i, j/exp_node_step, i)
                td_1.appendChild(document.createTextNode(step_row));
                
            }

            //Fill column in for that i
            //for(let k = i/exp_node_step; k < i; k++){
            if((i/exp_node_step)%2 == 0){
                continue;
            }
            
            headerRow.insertCell().outerHTML = `<th scope = "col" class="table-heading-col">${i/exp_node_step}</th>`;

            let value = exp_node_start;
            for(let j = 0; j < columnIndex; j++){
                let step_col = get_info(value, i/exp_node_step);

                let td_2 = document.getElementById(`r${j}`).insertCell();
                td_2.classList.add(colour_gen(step_col));
                td_2.classList.add("no-marg");
                td_2.appendChild(document.createTextNode(step_col));
                
                value+= exp_node_step;
            }
            //}

            //Do the furthest corner
            const step_size = get_info(i, i/exp_node_step);
            const td =tr.insertCell();
            td.classList.add(colour_gen(step_size));
            td.classList.add("no-marg");
            td.appendChild(document.createTextNode(step_size));
            
        }


        function get_info(node, chord){
            try{
                const g = graph(node, chord);
                lol = new Lollipop(g);
                paths = lol.execution(0);
                return paths.length - 2;
            }
            catch(e){
                return " "
            }
            
        }

        function colour_gen(step){
            if(step === " "){
                return "grey";
            }
            if(step < 10){
                return "dark-green";
            }
            else if(step < 35){
                return "green"
            }
            else if(step < 100){
                return "light-yellow";
            }
            else if(step < 450){
                return "yellow";
            }
            else if(step < 1750){
                return "orange";
            }
            else if(step < 5000){
                return "dark-orange";
            }
            else if(step < 12000){
                return "red";
            }
            else{
                return "dark-red";
            }
        }
    }

    function restart(){
        //Bring back buttons
        document.getElementById("own-input").classList.remove("hidden");
        document.getElementById("random-input").classList.remove("hidden");
        document.getElementById("normal-tests").classList.remove("hidden");
        document.getElementById("random-tests").classList.remove("hidden");

        //add hidden
        document.getElementById("experiment").classList.add("hidden");
        document.getElementById("restarter").classList.add("hidden");
        document.getElementById("regular-experiment").classList.add("hidden");

        //remove the table
        document.getElementById("experiment").innerHTML = `<tr id="header">
                                                                <th class="table-corner">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;\\ k→ <br>n↓ \\ 
                                                                </th>
                                                            </tr>`;
        

    }
}

 function random_exp(){
    //Remove the buttons
    document.getElementById("own-input").classList.add("hidden");
    document.getElementById("random-input").classList.add("hidden");
    document.getElementById("normal-tests").classList.add("hidden");
    document.getElementById("random-tests").classList.add("hidden");

    //Allow for count 
    document.getElementById("random-count").classList.remove("hidden");

    //restarting
    document.getElementById("ran-restart").onclick = restart;

    //Is user input needed? come back to maybe can add it then

    //Array to store the randoms will be reset after i iterations
    let data = [];

    //Need to loop for about 100 for every ten first
    for(let i = 10; i <= 1000; i += 10){
        let ran_arr = [];
        //run random for 100 times on every i, Need to append to an array
        for(let j = 0; j < 100; j++){
            //call random and append onto ran_arr
            let steps = get_info(i);
            if(get_info(i) != 0){
                ran_arr.push(steps);
            }

            console.log(i , j);
        }

        ran_arr.sort((a,b) => a - b);
        data.push({label: `${i}`, y: [
                                        d3.quantile(ran_arr, 0),
                                        d3.quantile(ran_arr, 0.25),
                                        d3.quantile(ran_arr, 0.75),
                                        d3.quantile(ran_arr, 1),
                                        d3.quantile(ran_arr,0.5)
        ]})

        

    }



    //need to create a boxplot off the ran_arr

    const chart = new CanvasJS.Chart("graph",{
        axisY: {
            title: "Steps"
        },
        data:[
            {
                type: "boxAndWhisker",
                color: "black",
                dataPoints: data
            }
        ]
    });

    chart.render();


    
    function get_info(node){
        try{
            const g = graph(node, 0, true);
            if(g == 0){
                return 0;
            }
            lol = new Lollipop(g);
            paths = lol.execution(0);
            return paths.length - 2;
        }
        catch(e){
            return " "
        }
    }

    function restart(){
        //Bring back buttons
        document.getElementById("own-input").classList.remove("hidden");
        document.getElementById("random-input").classList.remove("hidden");
        document.getElementById("normal-tests").classList.remove("hidden");
        document.getElementById("random-tests").classList.remove("hidden");

        //remove button
        document.getElementById("random-count").classList.add("hidden");

        document.getElementById("graph").innerHTML = `
                                                        <table id = "experiment" class="hidden experimental ">
                                                            <tr id="header">
                                                                <th class="table-corner">
                                                                &nbsp;&nbsp;&nbsp;&nbsp;\\ k→ <br>n↓ \\ 
                                                                </th>
                                                            </tr>
                                                        </table>`;
    }

 }