import { Db } from 'mongodb'
import { connectToDatabase } from '../../config/mongodb'
import { Employee } from '../../entities/Employee'
import { EmployeeRepository, ResponseMessage } from '../Employee'
import { ObjectId } from 'mongodb'
import { UpdateEmployeeDTO } from '../../useCases/UpdateEmployee/UpdateEmployeeDTO'

export class MongoDBEmployee implements EmployeeRepository {

  constructor(private db: Db = null) {}

  async init () {
    this.db = await connectToDatabase()
  }

  async create(employee: Employee): Promise<Employee> {
    try {
      if (!this.db) await this.init()

      const { nome, idade, cargo } = employee
      
      const { insertedId } = await this.db.collection('employee').insertOne({ nome, idade, cargo })

      return { id: String(insertedId), nome, idade, cargo }
    } catch (err) {
      return err
    }
  }

  async findOne(id: string): Promise<Employee> {
    if (!this.db) await this.init()

    try {
      const { _id, nome, idade, cargo } = await this.db
        .collection('employee')
        .findOne({ _id: new ObjectId(id) })

      return { id: String(_id), nome, idade, cargo }
    } catch (err) {
      return err
    }

  }

  async update(id: string, data: UpdateEmployeeDTO): Promise<Employee> {
    if (!this.db) await this.init()

    const update = { $set: {} }
    const { nome, idade, cargo } = data

    if (nome) update.$set = { nome }
    if (idade) update.$set = { idade }
    if (cargo) update.$set = { cargo }

    try {
      const { value } = await this.db.collection('employee').findOneAndUpdate(
        { _id: new ObjectId(id) },
        update,
        { returnDocument: 'after' }
      )

      return { id: value._id, nome: value.nome, idade: value.idade, cargo: value.cargo }
    } catch (err) {
      return err
    }
  }

  async delete(id: string): Promise<ResponseMessage> {
    if (!this.db) await this.init()

    try {
      await this.db.collection('employee').findOneAndDelete(
        { _id: new ObjectId(id) }
      )
  
      return { message: 'Employee successfully deleted' }
    } catch (err) {
      return err
    }
  }

}