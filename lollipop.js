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

    execution(){

    } 
}