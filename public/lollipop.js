class Lollipop{
    /**
     * 
     * @param {Array<Array<Number>} chords 
     * 
     * The algorithm already assumes that a Hamiltonian cycle is found
     * in [0,1,2, ... , n - 1]. It will then use this to create a new
     * Hamiltonian cycle.
     */
    constructor(chords){
        //Takes in the chords created via graph.js
        this.chords = chords;
        //To calculate how many vertices will be in the graph
        this.verticies = 2 * chords.length;
        //Create an empty array which at each index will store what node it should be connected too.
        this.chord_arr = Array(this.verticies);

        //Loop through chords array to populate chord_arr
        for(let i = 0; i < chords.length; i++){
            this.chord_arr[chords[i][0]] = chords[i][1];
            this.chord_arr[chords[i][1]] = chords[i][0]; 
        }
    }

    //vertex is the first vertex in the orginal Hamiltonian path

    execution(vertex, direction = "forward"){
        //Create an array to store all the Hamiltonian paths found in the graph
        let ham_paths = [];
        //Storing the current Hamiltonian path currently working with.
        let current_path = [];
        //Will create an array to store all the connecting chords to last vertex's in the paths
        let connect_chords = [];
        //store the current chord in a variable.
        let current_chord = [];

        //intialise the first lollipop: the Hamiltonian path + a closing vertex.
        if (direction == "forward"){
            current_path = [...Array(this.verticies).keys()].slice(vertex);
            //If the Hamiltonain path did not start with zero then need to append the other values onto end of the array.
            if(vertex != 0){
                current_path.push(...Array(vertex).keys())
            }
        }
        else{
            current_path = [...Array(vertex + 1).keys()].reverse();
            //If the Hamiltonain path is not starting at the last vertex then need to add rest on starting from the last
            if(vertex != this.verticies - 1){
                current_path.push(...[...Array(this.verticies)].slice(vertex + 1).reverse());
            }
        }
        //Add using the last element on the current_path.
        current_chord = this.chord_arr[current_path[current_path.length-1]];

        //Now append the both ham_paths and connect_chords.
        ham_paths.push(current_path);
        connect_chords.push(current_chord);


        //Create an array for the new Hamiltonian path
        let new_ham_path = [];
        //Need to find the index of the vertex which will close the path
        let closing_vertex = 0;
        //An array which stores all the connections to the last vertex in the array
        let closing_connections = [];
        //create step count 
        let steps = 0;

        //loop through the lollipop algorithm. Need to kepe looping until  a new Hamiltonian cycle is found.
        while(current_chord != vertex){
            //Copy the current path found into new path and then change closing vertex depending on current_chord value.
            for(let i = 0; i < this.verticies; i++){
                new_ham_path.push(current_path[i]);
                if(current_path[i] == current_chord){
                    closing_vertex = i;
                    break;
                }
                
            }


            //Now need to walk backwards along the path
            for(let i = this.verticies - 1; i > closing_vertex; i--){
                new_ham_path.push(current_path[i]);
            }
            current_path = new_ham_path;
            

            //Need to find what to set the next current_chord to be
            //Find the last element in the new_ham_path
            closing_vertex = new_ham_path[new_ham_path.length-1];
            
            //Create an array of all the connections to that current vertex
            closing_connections = [ (closing_vertex - 1) % this.verticies,
                                    (closing_vertex + 1) % this.verticies,
                                    this.chord_arr[closing_vertex]];
            //Now need to check if a connection already exists in the path
            //To do this check if current_chord is in the connection and if it is remove it
            if(closing_connections.includes(current_chord)){
                closing_connections.splice(closing_connections.indexOf(current_chord), 1);
            }
            if(closing_connections.includes(new_ham_path[new_ham_path.length-2])){
                closing_connections.splice(closing_connections.indexOf(new_ham_path[new_ham_path.length-2]), 1);
            }
            current_chord = closing_connections[0];
            
            ham_paths.push(current_path)
            connect_chords.push(current_chord)
            new_ham_path = [];
            steps++;
        }

        ham_paths.push([...ham_paths[ham_paths.length - 1], 0]);

        return ham_paths;
        // const output = `Chord Length: ${this.chords[0][1]}\nNumber of vertices: ${this.verticies}\nSteps ${steps}\nLog steps: ${Math.floor(Math.log(steps, 2))}`;
        // fs.writeFile("./output.txt", output, (err) => {
        //     if(err){
        //         return console.log(err);
        //     }
        //     console.log("file saved");
        // })

    }
    /**
     * To print the graph on the graph section
     * 
     * @author Holly Lampert
     */
    print_graph(ham_path, nored=false){
        d3.selectAll('svg').remove();
        //Create an svg element which will contain the graph drawing
        const svg = d3.select('#graph')
                      .append('svg')
                      .attr('width', document.getElementById('graph').clientWidth) //find the width of the div
                      .attr('height', document.getElementById('graph').clientHeight) //find the height of the div
        
        let nodesObj = {};

        let distance_width = document.getElementById('graph').clientWidth - 100;
        let distance_height = document.getElementById('graph').clientHeight - 100;

        //Find the angle of which will be distance between start and each vertex using radians
        let angle = (2*Math.PI)/this.verticies;
        //Find the diameter of circle to be used, however need to determine smallest of width and heigth
        let diameter = 0;
        
        if(distance_height > distance_width){
            diameter = distance_width;
        }
        else{
            diameter = distance_height;
        }
        //Find the center point of the graph
        let center = [document.getElementById('graph').clientWidth/2, document.getElementById('graph').clientHeight/2];
        //Find radius of the "circle" to be used
        let radius = diameter/2;
        //Create a copy of the object into an array as well
        let node_arr = [];
        //Create an array of objects to show the connections between nodes
        //to do so will have to orgianlly loop through to create connections that were next to each other
        // for the chrods will have to use the chords given in this.chords 
        let edges = []
        
        //loop through and populate nodesObj until same amount of coordinates as there is nodes
        for(let i = 0; i < this.verticies; i++){
            nodesObj[i] = {x: Math.floor(center[0] + (radius * Math.cos(-angle))), y: Math.floor(center[1] + (radius * Math.sin(-angle))), index: i};
            angle += (2*Math.PI)/this.verticies;
            node_arr.push(nodesObj[i]);
        }

        //Create the intial connections between the next to nodes     
        for(let i = 0; i < this.verticies; i++){
            if(i == this.verticies - 1){
                edges.push({"source": nodesObj[i], "target": nodesObj[0], "paths": false})
            }
            else{
                edges.push({"source": nodesObj[i], "target": nodesObj[i + 1], "paths": false})
                
            }
        }

        //Create the chords 
        //Need to show if connection will be red or not, need an attribute to decide if this edge is in hamiltonanian cycle
        for(let i = 0; i < this.chords.length; i++){
            edges.push({"source": nodesObj[this.chords[i][0]], "target": nodesObj[this.chords[i][1]], "paths": false})
        }

        //Need to show if connection will be red or not, need an attribute to decide if this edge is in hamiltonanian cycle
        //Should have all the edges and can loop and add attribute to it with true or false
        for(let i = 0; i < ham_path.length ; i++){
            for(let j = 0 ; j < edges.length; j++){
                if(ham_path[i] < ham_path[i+1]) {
                    if((edges[j].source.index == ham_path[i] && edges[j].target.index == ham_path[i + 1]) || (edges[j].source.index == ham_path[i + 1] && edges[j].target.index == ham_path[i])){
                        edges[j].paths = true;
                    }
                }
                else {
                    if((edges[j].target.index == ham_path[i] && edges[j].source.index == ham_path[i + 1]) || (edges[j].target.index == ham_path[i + 1] && edges[j].source.index == ham_path[i])){
                        edges[j].paths = true;
                    }
                }
            }
        }

        const edge_group = svg.append('g')
                              .selectAll()
                              .data(edges)
                              .enter();
        
        const edge_lines = edge_group.append('line')
                                     .attr('x1', (d) => d.source.x)
                                     .attr('y1', (d) => d.source.y)
                                     .attr('x2', (d) => d.target.x)
                                     .attr('y2', (d) => d.target.y)
                                     .attr('stroke-width', (d) => {
                                         if(nored){return 2}
                                         if(d.paths == true) {return 4}
                                         else {return 2}
                                     })
                                     //create so depending on the given array will decide the colour of the edge
                                     .attr('stroke', (d) => {
                                         if(nored){return 'black'}
                                         if(d.paths == true){return 'red'}
                                         else{return 'black'}
                                     });

        const vertex_group = svg.append('g')
                                .selectAll()
                                .data(node_arr)
                                .enter();

        const vertex_points = vertex_group.append('circle')
                                        .attr('cx', (n) => n.x)
                                        .attr('cy', (n) => n.y)
                                        .attr('stroke', 'black')
                                        .attr('stroke-width', 2)
                                        .attr('r', 12)
                                        .attr('fill', 'white');

        const text_points = vertex_group.append('text')
                                        .text((n) => n.index)
                                        .attr('text-anchor', 'middle')
                                        .attr('x', (n) => n.x)
                                        .attr('y', (n) => n.y+4);


    }
}