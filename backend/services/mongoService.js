var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = 'mongodb+srv://<user>:<password><your URL>';
    const dbName = 'Task_Manager_Db';  
    
    const client = new MongoClient(url, { useNewUrlParser: true });

    return client.connect()
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Disconnected!');
                dbConn = null;
            })
            dbConn = client.db(dbName)
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}

