/**
 * @author Holly Lampert
 * 
 * @param {Number} num_nodes 
 * @param {Number} chord_len 
 * 
 * 
 * Will generate a graph based on the number of nodes that have 
 * been passed, as well using the given chord length that will determine 
 * the length of the third edge on each node.
 * 
 */
function graph(num_nodes, chord_len, random = false){
    console.log(`Nodes: ${num_nodes}, Chords: ${chord_len}`)
    let diagram = [];
    let num_chords = num_nodes/2;
    //Create an array to store what vertices will have degree 3 already, will be used when chord length is even
    let nodes_found = [];

    //Create an array of 1's and 0's where 1 shows a connection can't be made here
    let arr_choices = [...Array(num_nodes)].map(e => Array(num_nodes));
    //fill the array with zeros
    arr_choices.map(a => a.fill(0));
    //Create an array to reset too if need too
    let arr_reset;
    //Random value
    let random_value = 0;
    //second random
    let random_connect = 0;
    //Create a temp array to hold which values of i can be used to create random link.
    let temp_arr = [];
    //object to store each key has each node with value of 0 intialally and if 1 then means that is has 3 connections already.
    let degree_check = {};
    //for finding degree
    let found = false;
    let found_first = false;


    //The for loop will create an array which will contain arrays. In the 
    //contained arrays it should contain the start and end point of a
    //chord for the graph.
    if(random){
        if(num_nodes%2 == 0){
            //Create the inital places where each node cant connect too.
            for(let i = 0; i < num_nodes; i++){
                arr_choices[i][i] = 1;
                if(i != num_nodes - 1){
                    arr_choices[i][i + 1] = 1;
                }
                else{
                    arr_choices[i][0] = 1;
                }

                if(i != 0){
                    arr_choices[i][i - 1] = 1;
                }
                else{
                    arr_choices[i][num_nodes - 1] = 1;
                }
                degree_check[i] = 0;
                
            }
            
            //copy the arr to arr_reset.
            arr_reset = arr_choices.map((arr) => {
                return arr.slice();
            });

            //Pick a random node and another one from the list of nodes in the array at that i in the 2d array where the values are 0.
            while(nodes_found.length != num_nodes){
                
                //check to see if this is also of degree 3
                while(!found_first){
                    random_value = Math.floor(Math.random() * num_nodes);
                    if(degree_check[random_value] == 0){
                        found_first = true;
                    }
                }
                
                found_first = false;

                for(let i = 0; i < arr_choices[random_value].length; i++){
                    if(arr_choices[random_value][i] == 0){
                        temp_arr.push(i);
                    }
                }

                if(temp_arr.length != 0){
                    //Create the second connection usng which values can be selected. Check to see if degree 3 connection, can use a found
                    while(!found){
                        random_connect = temp_arr[Math.floor(Math.random() * temp_arr.length)];
                        if(degree_check[random_connect] == 0){
                            
                            found = true;
                        }
                    }

                    
                    //reset found
                    found = false;

                    //add to object values
                    degree_check[random_connect] = 1;
                    degree_check[random_value] = 1;

                    //push the nodes found that create a connection
                    nodes_found.push(random_value);
                    nodes_found.push(random_connect);

                    //update the arr_choices to symbolise the new connections.

                    for(let i = 0; i <arr_choices.length; i++){
                        arr_choices[random_value][i] = 1;
                        arr_choices[random_connect][i] = 1;
                        arr_choices[i][random_value] = 1;
                        arr_choices[i][random_connect] = 1;
                    }

                    arr_choices[random_value][random_connect] = 1;
                    arr_choices[random_connect][random_value] = 1;

                    //push the connection to diagram.
                    diagram.push([random_value, random_connect]);

                    //reset temp.
                    temp_arr = [];
                }
                else{
                    nodes_found.pop();
                    nodes_found.pop();
                    degree_check[random_connect] = 0;
                    degree_check[random_value] = 0;
                    const values = diagram.pop();

                    for(let i = 0; i <arr_choices.length; i++){
                        if(!nodes_found.includes(i)){
                            arr_choices[values[0]][i] = 0;
                            arr_choices[values[1]][i] = 0;
                            arr_choices[i][values[0]] = 0;
                            arr_choices[i][values[1]] = 0;
                        }
                        
                    }
                    for(let i = 0; i < num_nodes; i++){
                        arr_choices[i][i] = 1;
                        if(i != num_nodes - 1){
                            arr_choices[i][i + 1] = 1;
                        }
                        else{
                            arr_choices[i][0] = 1;
                        }
        
                        if(i != 0){
                            arr_choices[i][i - 1] = 1;
                        }
                        else{
                            arr_choices[i][num_nodes - 1] = 1;
                        }
                        degree_check[i] = 0;
                        
                        
                    }

                }

            }
            
        }
        else{
            throw "Invalid node size";
        }
    }
    else{
        if(num_nodes%chord_len == 0 && num_nodes%2 == 0){
            //need to check if the chord length is even and will need to make sure that number of vertices / chord length is also even too.
            if(chord_len%2 == 0 && (num_nodes / chord_len) % 2 == 0){
                for(let i = 0; i < num_chords; i++){
                    if(!nodes_found.includes((2*i) % num_nodes)){
                        diagram.push([(2*i) % num_nodes, ((2*i) + chord_len % num_nodes)]);
                        // push to nodes_found when added so can skip that index if already been matched up.
                        nodes_found.push((2*i) % num_nodes);
                        nodes_found.push((2*i + chord_len ) % num_nodes);
                    }  
                }
                for(let i = 0; i < num_chords; i++){
                    if(!nodes_found.includes(((2*i) + 1)%num_nodes)){
                        diagram.push([((2*i) + 1)% num_nodes , ((2*i) + 1 + chord_len) % num_nodes]);
                        nodes_found.push(((2*i) + 1) % num_nodes);
                        nodes_found.push(((2*i) + 1 + chord_len) % num_nodes);
                    }
                }
            }
            else if(chord_len%2 == 1){
                for(let i = 0; i < num_chords; i++){
                    diagram.push([(2*i) % num_nodes, ((2*i) + chord_len) % num_nodes]);
                }
            }
            else{
                throw "Invlaid graph: A mismatch between number of nodes and chord length";
            }
        }
        else{
            //Will need to indicate to the browser later that uder input invalid data
            throw "Invlaid graph: Graph cannot be made with this chord length and number of nodes"
        }
    }
    
    console.log(diagram)
    return diagram;
}