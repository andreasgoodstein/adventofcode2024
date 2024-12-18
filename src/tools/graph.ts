export type GraphNode = [x: number, y: number, value?: number];
type GraphNodeValue = { edges: GraphNode[]; value?: number };
type GraphMap = Map<string, GraphNodeValue>;

const getNodeId = (node: GraphNode) => `${node[0]},${node[1]}`;

export class Graph {
  private enableReverseLookup: boolean;
  private nodes: GraphMap;
  private reverseNodes: GraphMap;

  constructor(enableReverseLookup = false) {
    this.enableReverseLookup = enableReverseLookup;
    this.nodes = new Map<string, GraphNodeValue>();
    this.reverseNodes = new Map<string, GraphNodeValue>();
  }

  public addNode = (node: GraphNode) => {
    this.nodes.set(getNodeId(node), { edges: [], value: node[2] });

    if (this.enableReverseLookup) {
      this.reverseNodes.set(getNodeId(node), { edges: [], value: node[2] });
    }
  };

  public addEdge = (from: GraphNode, to: GraphNode) => {
    let { edges, value } = this.nodes.get(getNodeId(from)) ?? {};
    edges = [...(edges ?? []), to];
    this.nodes.set(getNodeId(from), { edges, value });

    if (this.enableReverseLookup) {
      let { edges, value } = this.reverseNodes.get(getNodeId(to)) ?? {};
      edges = [...(edges ?? []), from];
      this.reverseNodes.set(getNodeId(to), { edges, value });
    }
  };

  public getAllNodes = () => this.nodes;

  public getAllReverseNodes = () => {
    if (!this.enableReverseLookup) {
      throw Error("Reverse lookup not enabled");
    }

    return this.reverseNodes;
  };

  public getNode = (node: GraphNode) => this.nodes.get(getNodeId(node));

  public getReverseNode = (node: GraphNode) => {
    if (!this.enableReverseLookup) {
      throw Error("Reverse lookup not enabled");
    }

    return this.reverseNodes.get(getNodeId(node));
  };

  [Symbol.for("nodejs.util.inspect.custom")](/*depth, opts*/) {
    return this.nodes;
  }
}
