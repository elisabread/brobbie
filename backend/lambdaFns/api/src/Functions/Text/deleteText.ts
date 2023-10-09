import { gremlinConnection } from "../gremlinConnection/gremlinConnection";

async function createPost(id: string): Promise<string> {
  try {
    const gremlin = new gremlinConnection();
    const res = await gremlin.g.V(id).drop().next();
    gremlin.close();
    return `${id} has been deleted successfully.`;
  } catch (e) {
    return "An error has occurred.";
  }
}
export default createPost;
