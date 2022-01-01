import { Db, MongoClient } from 'mongodb'

export async function connectToDatabase(): Promise<Db> {

  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('MongoDB connected')
    const db = client.db('test')
    return db
  } catch (err) {
    console.log('Error connecting to mongodb')
  }

}