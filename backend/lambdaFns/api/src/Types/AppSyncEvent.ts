import Text from "./Text";
import Comment from "./Comment";

export type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    textID: string;
    comment?: Comment;
    text?: Text;
    id?: string; //ID for the specific item to be fetched
    limit?: number; //How many fetched items
    after?: string; //Keyset pagination.
  };
};

export type AppSyncInput = {
  id?: string; //ID for the specific item to be fetched
  limit?: number; //How many fetched items
  after?: string; //Keyset pagination.
};
