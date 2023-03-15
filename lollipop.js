// const fs = require('fs')

/*module.exports =*/ class Lollipop{
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
            
            //console.log(current_path)

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
    print_graph(){
        //Create an svg element which will contain the graph drawing
        const svg = d3.select('#graph')
                      .append('svg')
                      .attr('width', document.getElementById('graph').clientWidth) //find the width of the div
                      .attr('height', document.getElementById('graph').clientHeight) //find the height of the div
        
        let nodesObj = {};
        //at middle[0] will contain the x value for centre point and middle[1] contains the y value for centre point
        let middle = [document.getElementById('graph').clientWidth / 2, document.getElementById('graph').clientHeight / 2];
        let spaces = (2*Math.PI)/this.verticies;
        console.log("ghehe", spaces)

        let distance_width = document.getElementById('graph').clientWidth - 100;
        let distance_height = document.getElementById('graph').clientHeight - 100;
        //Find how many stages there will be in the ifs
        let stages = 0;
        //keep track of how many been added
        let count = 0;

        console.log("hhe" + distance_width)

        if(this.verticies % 4 == 0){
            stages = this.verticies / 4;
            for(let i = 0; i < stages; i++){
                if(i == 0){
                    nodesObj[count] = {x: 100, y: distance_height/2}
                    count++;
                    nodesObj[count] = {x: distance_width,y: distance_height/2};
                }
            }
        }
        else{
            stages = (this.verticies - 2)/ 4;
        }

        console.log(nodesObj)

        //Create an object which will hold objects which of where the coordinates will be

    } 
}