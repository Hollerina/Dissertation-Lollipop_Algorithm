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
/*module.exports =*/ function graph(num_nodes, chord_len){
    let diagram = [];
    let num_chords = num_nodes/2;
    //Create an array to store what vertices will have degree 3 already, will be used when chord length is even
    let nodes_found = [];

    //The for loop will create an array which will contain arrays. In the 
    //contained arrays it should contain the start and end point of a
    //chord for the graph.
    if(num_nodes%chord_len == 0){
        //need to check if the chord length is even and will need to make sure that number of vertices / chord length is also even too.
        if(chord_len%2 == 0 && (num_nodes / chord_len) % 2 == 0){
            for(let i = 0; i < num_chords/2; i++){
                if(!nodes_found.includes((2*i) % num_nodes)){
                    diagram.push([(2*i) % num_nodes, ((2*i) + chord_len % num_nodes)]);
                    // push to nodes_found when added so can skip that index if already been matched up.
                    nodes_found.push((2*i) % num_nodes);
                    nodes_found.push((2*i + chord_len ) % num_nodes);
                }  
            }
            for(let i = 0; i < num_chords/2; i++){
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

    return diagram;
}