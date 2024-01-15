# Dissertation Project --> <a href="https://lollipop-algorithm.web.app/">Lollipop</a> 🍭
The goal of my project was to create a simulation of the Lollipop algorithm for my supervisor to help with his research. 

## Overview
The project main aspects included a step by step run through of the algorithm, step by step run through of the algorithm on random based graphs and be able to produce a data of mass input for each of these types of graphs.

### Step by Step run through on normal graphs:
This stage allowed for a walk through of the algorithm on graphs where the user will enter the number of nodes they wanted and the node step size which is the gap between the chords. The walktrhough shows a redline to show the current Hamiltonian cycle at the current stage. As well as the opertunnity to add this exerpiment to a smaller table to compare data.

### Step by step run through on random graphs:
This run through is to test the performance on randomly placed chords within the graph. Following the same steps in normal graphs.

### Tables of mass data:
Here the algorithm is performed thousands of times to produce a graph for the respective graph type. If it is for a normal based graph then the user is promted to enter the start and end point for number of nodes as well as the step count for the differnce between each node size. The algorithm is then performed on each of the data sets and added to a table which is displayed to the user as a heatmap. Where the colour depends on the number of steps taken to perform that algorithm. The random graphs will take in a start and end input. It will then test on these numbers with random chord placement a 1000 times to be able to produce a boxplot of the data. At the end a graph of boxplots is placed to show the correlation.
