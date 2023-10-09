import { Handler } from "aws-cdk-lib/aws-lambda";
import listText from "./src/Functions/Text/listText";
import listTexts from "./src/Functions/Text/listTexts";
import createText from "./src/Functions/Text/createText";
import { AppSyncEvent } from "./src/Types/AppSyncEvent";
import deleteText from "./src/Functions/Text/deleteText";
import updateText from "./src/Functions/Text/updateText";
import createComment from "./src/Functions/Comment/createComment";
import listComments from "./src/Functions/Comment/listComments";

////////////////////////////////////////////////////////////////////////////////
// Handler
////////////////////////////////////////////////////////////////////////////////

export const handler: Handler = async (event: AppSyncEvent) => {
  try {
    switch (event.info.fieldName) {
      case "listText": {
        if (event.arguments.id) {
          let res = await listText(event.arguments.id);
          return res;
        }
        throw new Error("Missing event input arguments.");
      }
      case "listTexts": {
        let res = await listTexts();
        return res;
      }
      case "createText": {
        if (event.arguments["text"]) {
          return await createText(event.arguments["text"]);
        }
        throw new Error("Missing event input arguments.");
      }
      case "deleteText": {
        if (event.arguments.id) {
          return await deleteText(event.arguments.id);
        }
        throw new Error("Missing event input arguments.");
      }
      case "updateText": {
        if (event.arguments["text"] && event.arguments["id"]) {
          return await updateText(
            event.arguments["text"],
            event.arguments["id"],
          );
        }
        throw new Error("Missing event input arguments.");
      }
      case "createComment": {
        if (event.arguments["comment"]) {
          return await createComment(event.arguments["comment"]);
        }
        throw new Error("Missing event input arguments.");
      }
      case "listComments": {
        console.log("Event args: ", event.arguments);
        if (event.arguments["textID"]) {
          let res = await listComments(event.arguments["textID"]);
          return res;
        }
        throw new Error("Missing event input arguments.");
      }
      case "updateComment": {
        if (event.arguments["comment"] && event.arguments["id"]) {
          return await updateText(
            event.arguments["comment"],
            event.arguments["id"],
          );
        }
        throw new Error("Missing event input arguments.");
      }
      default: {
        return {
          statusCode: 500,
          headers: { "Content-Type": "text/plain" },
          body: "Oh no! Something went wrong.",
        };
      }
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: "Oh no! Something went wrong.",
    };
  }
};
