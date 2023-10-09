import getVerticeProperties from "../gremlinConnection/getVerticeProperties";
import Text from "../../Types/Text";

const listText = async (id: string) => {
  try {
    const text: Text = { id: id };
    const textWithProps: Text[] = await getVerticeProperties([text]);

    return textWithProps[0];
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: "Oh no! Something went wrong.",
    };
  }
};

export default listText;
