import { gremlinConnection } from "../gremlinConnection/gremlinConnection";
import Text from "../../Types/Text";

async function createText(text: Text) {
  const gremlin = new gremlinConnection();
  const data = await gremlin.g
    .addV("text")
    .property("title", text.title)
    .property("content", text.content)
    .property("creator", text.creator)
    .property("jobTitle", text.jobTitle)
    .property("jobApplyUrl", text.jobApplyUrl)
    .property("jobDesc", text.jobDesc)
    .property("company", text.company)
    .next();
  text.id = data.value.id;
  gremlin.close();
  return text;
}
export default createText;
