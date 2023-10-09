import { gremlinConnection } from "../gremlinConnection/gremlinConnection";
import Comment from "../../Types/Comment";
const gremlin = require("gremlin");
const __ = gremlin.process.statics;

async function createComment(comment: Comment) {
  const gremlin = new gremlinConnection();

  console.log("comment", comment);

  const data = await gremlin.g
    .addV("comment")
    .property("authorID", comment.authorID)
    .property("content", comment.content)
    .property("textID", comment.textID)
    .property("timestamp", comment.timestamp)
    .next();
  comment.id = data.value.id;

  const edge = await gremlin.g
    .V(comment.textID)
    .addE("has")
    .to(__.V(comment.id))
    .next();

  gremlin.close();
  console.log("DB response: ", comment);
  return comment;
}
export default createComment;
