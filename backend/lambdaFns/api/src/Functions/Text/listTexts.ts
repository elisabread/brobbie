import getVerticeProperties from "../gremlinConnection/getVerticeProperties";
import Text from "../../Types/Text";
import { gremlinConnection } from "../gremlinConnection/gremlinConnection";
import GremlinVertex from "../../Types/GremlinVertex";

const listTexts = async () => {
  try {
    const gremlin = new gremlinConnection();

    const textVertice: GremlinVertex[] = (await gremlin.g
      .V()
      .hasLabel("text")
      .toList()) as unknown as GremlinVertex[];
    let texts: Text[] = [];
    textVertice.forEach((vertex) => {
      let text: Text = { id: vertex["id"] };
      texts.push(text);
    });
    gremlin.close();
    const textsWithProps: Text[] = await getVerticeProperties(texts);
    return textsWithProps;
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: "Oh no! Something went wrong.",
    };
  }
};

export default listTexts;
