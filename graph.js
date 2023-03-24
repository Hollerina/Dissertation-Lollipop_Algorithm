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

    //For random create an array to select conecting vertices from, will populate later on;
    let random_nodes = [];
    //Use a found when finding a random edge to select
    let found = false;
    //Counter to loop through unmatched nodes
    let count = 0;
    //Random value
    let random_value = 0;

    //The for loop will create an array which will contain arrays. In the 
    //contained arrays it should contain the start and end point of a
    //chord for the graph.
    if(ramdom){
        if(num_nodes%2 == 0){
            //Create an array to pick nodes from
            for(let i = 0; i < num_nodes; i++){
                random_nodes.push(i);
            }

            //Now need to select vertices at random to join up
            //cant be a node that is already connected too.
            //maybe recursive?
            while(nodes_found.length != num_nodes){
                while(!found){
                    random_value = Math.random(random_nodes.length);
                    if(random_nodes[count] == 0 && random_nodes[random_value] != 1 && random_nodes[random_value] != num_nodes - 1){
                        diagram.push([random_nodes[count], random_nodes[random_value]]);
                        found = true;
                        nodes_found.push(random_nodes[count]);
                        nodes_found.push(random_nodes[random_value]);
                        random_nodes.filter(number_remove => number_remove == random_nodes[count] || number_remove == random_nodes[random_value]);
                    }
                    else if(random_nodes[count] == num_nodes - 1 && random_nodes[random_value] != num_nodes - 2 && random_nodes[random_value] != 0){
                        diagram.push([random_nodes[count], random_nodes[random_value]]);
                        found = true;
                        nodes_found.push(random_nodes[count]);
                        nodes_found.push(random_nodes[random_value]);
                        random_nodes.filter(number_remove => number_remove == random_nodes[count] || number_remove == random_nodes[random_value]);
                        
                    }
                }
                count++;
                found = false
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
                    console.log("This is where i is: " + (2*i) % num_nodes)
                    if(!nodes_found.includes((2*i) % num_nodes)){
                        diagram.push([(2*i) % num_nodes, ((2*i) + chord_len % num_nodes)]);
                        // push to nodes_found when added so can skip that index if already been matched up.
                        nodes_found.push((2*i) % num_nodes);
                        nodes_found.push((2*i + chord_len ) % num_nodes);
                    }  
                }
                for(let i = 0; i < num_chords; i++){
                    if(!nodes_found.includes(((2*i) + 1)%num_nodes)){
                        console.log("HERE")
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