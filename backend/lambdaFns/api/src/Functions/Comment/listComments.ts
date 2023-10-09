import getVerticeProperties from "../gremlinConnection/getVerticeProperties";
import Comment from "../../Types/Comment";
import { gremlinConnection } from "../gremlinConnection/gremlinConnection";
import GremlinVertex from "../../Types/GremlinVertex";

const listComments = async (textID: string) => {
  try {
    const gremlin = new gremlinConnection();

    const commentVertice: GremlinVertex[] = (await gremlin.g
      .V()
      .hasLabel("comment")
      .has("textID", textID)
      .toList()) as unknown as GremlinVertex[];
    let comments: Comment[] = [];
    commentVertice.forEach((vertex) => {
      let comment: Comment = { id: vertex["id"] };
      comments.push(comment);
    });
    gremlin.close();
    const commentsWithProps: Comment[] = await getVerticeProperties(comments);
    return commentsWithProps;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "comment/plain" },
      body: "Oh no! Something went wrong.",
    };
  }
};

export default listComments;
