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
function graph(num_nodes, chord_len){
    let diagram = [];
    let num_chords = num_nodes/2;

    //The for loop will create an array which will contain arrays. In the 
    //contained arrays it should contain the start and end point of a
    //chord for the graph.
    if(num_nodes%chord_len == 0){
        for(let i = 0; i < num_chords; i++){
            diagram.push([(2*i) % num_nodes, ((2*i) + chord_len) % num_nodes]);
        }
    }
    else{
        //Will need to indicate to the browser later that uder input invalid data
        return null
    }


    return diagram;

}
