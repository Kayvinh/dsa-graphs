/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    // Undirected
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

    //directed 1 way???
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */

  //
  //              A         seen(A)
  //            /   \       stack()
  //          B       C   check adjsList
  //            \   /     whatever is in adjList gets pushed onto stack
  //              D
  //                      return seen

  //
  //              A
  //                \
  //                C
  //               /
  //              D
  //

  removeVertex(vertex) {
    // remove node from graph
    this.nodes.delete(vertex);

    // update adjacenty list
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
  }

  //                       Q --P -- S
  //                      /  \ |      \
  //                     R     X   --  U
  //                     | \   |  \   /
  //                     |  \  |    V
  //                      \    Y    |
  //                       \     \  /
  //                         T --- W
  //

  /** traverse graph with DFS and returns array of Node values */
  // DFS ITERATIVE
  // depthFirstSearch(start) {
  //   let valuesOnly = [];
  //   // LIFO -- use a stack
  //   let stack = [start];

  //   // have a set with seen values
  //   let seen = new Set(stack);

  //   // keep track of current node
  //   while (stack.length > 0) {

  //     let curr = stack.pop();
  //     valuesOnly.push(curr.value);

  //     for (let adjNode of curr.adjacent) {
  //       if (!seen.has(adjNode)) {
  //         stack.push(adjNode);
  //         seen.add(adjNode);
  //       }
  //     }
  //   }

  //   // // console.log("values=", valuesOnly);
  //   return valuesOnly;
  // }


  //                       Q --P -- S
  //                      /  \ |      \
  //                     R     X   --  U
  //                     | \   |  \   /
  //                     |  \  |    V
  //                      \    Y    |
  //                       \     \  /
  //                         T --- W
  //\
  //TODO: clean this up
  //    ____Q___
  // DFS RECURSIVE
  depthFirstSearch(start, seen = new Set([start])) {
    let vals = [];
    for (let adjNode of start.adjacent) {
      if (!seen.has(adjNode)) {
        seen.add(adjNode);
        return this.depthFirstSearch(adjNode, seen);
      }
    }
    for (let node of seen.values()) {
      vals.push(node.value);
    }
    return vals;
  }
  //                       Q --P -- S
  //                      /  \ |      \
  //                     R     X  ---  U
  //                     | \   |  \   /
  //                     |  \  |    V
  //                      \    Y    |
  //                       \     \  /
  //                         T --- W
  //
  // queue = [X, Q, U]
  // values = [P, S]
  // seen = [S, P, U]

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    //FIFO -- use a queue
    let queue = [start];
    let values = [];
    let seen = new Set(queue);

    while (queue.length) {
      let curr = queue.shift();
      values.push(curr.value);

      for (let adjNode of curr.adjacent) {
        if (!seen.has(adjNode)) {
          queue.push(adjNode);
          seen.add(adjNode);
        }
      }
    }
    return values;
  }


  //            R
  //         /  |  \
  //        I - T - H
  //                |
  //                M
  //
  // R -> M = 2

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    if(start == end) return 0;
    //FIFO -- use a queue
    //each arr has a node and a distance
    let queue = [[start, 0]];
    let values = [];
    let seen = new Set(queue);

    while (queue.length) {
      let [curr, dist] = queue.shift();

      if(curr === end) return dist;

      for (let adjNode of curr.adjacent) {
        if (!seen.has(adjNode)) {
          seen.add(adjNode);
          queue.push([adjNode, dist+1]);
        }
      }
    }
  }
}

module.exports = { Graph, Node };
