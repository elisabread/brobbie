import { gremlinConnection } from "../gremlinConnection/gremlinConnection";
import Text from "../../Types/Text";

async function updateText(text: Text, id: string) {
  const gremlin = new gremlinConnection();
  const updateVertexInNeptune = await gremlin.g
    .V(id)
    .property("title", text.title)
    .property("content", text.content)
    .property("creator", text.creator)
    .property("jobTitle", text.jobTitle)
    .property("jobApplyUrl", text.jobApplyUrl)
    .property("jobDesc", text.jobDesc)
    .property("company", text.company)
    .property("collaborator", text.collaborator)
    .next();
  text.id = id;
  gremlin.close();
  return text;
}
export default updateText;
