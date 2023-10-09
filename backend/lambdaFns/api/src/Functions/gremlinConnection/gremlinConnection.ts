import * as gremlin from "gremlin";

// const gremlin = require("gremlin");
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.NEPTUNE_READER;
const port = process.env.PORT;

////////////////////////////////////////////////////////////////////////////////
// Gremlin connection Class
////////////////////////////////////////////////////////////////////////////////
export class gremlinConnection {
  dc: gremlin.driver.DriverRemoteConnection;
  graph: gremlin.structure.Graph;
  g: gremlin.process.GraphTraversalSource<gremlin.process.GraphTraversal>;

  constructor() {
    this.dc = new DriverRemoteConnection(`wss://${uri}:${port}/gremlin`, {});
    this.graph = new Graph();
    this.g = this.graph.traversal().withRemote(this.dc);
  }
  /**
   * Close the gremlin connection. Important!!
   */
  close(): void {
    this.dc.close();
  }
}
