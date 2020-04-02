import { MongoClient } from "mongodb";

const dbConnectionUrl =
  "mongodb+srv://admin:welcome@123@cluster0-e6ksx.mongodb.net/test?retryWrites=true&w=majority";

const initialize = (
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) =>
  MongoClient.connect(dbConnectionUrl, (err, dbInstance) => {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      return failureCallback(err); // this should be "caught" by the calling function
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log("[MongoDB connection] SUCCESS");
      return successCallback(dbCollection);
    }
  });

export { initialize };
