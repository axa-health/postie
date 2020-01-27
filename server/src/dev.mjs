import { createServers } from "./index.mjs";
import mongodbModule from 'mongodb';

const { MongoClient } = mongodbModule;

(async () => {
    const mongo = await MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
    
    const { graphqlServer, smtpServer } = createServers({ mongo });

    smtpServer.listen(1030);
    graphqlServer.listen(8025).then(({ url, subscriptionsUrl }) => {
        console.log(`🚀 Server ready at ${url} / ${subscriptionsUrl}`);
    });
})();
