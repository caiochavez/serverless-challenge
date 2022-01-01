import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase'
import { MongoClient, Db } from 'mongodb'

describe('Create Employee', () => {

  describe('Using the MongoDB implementation', () => {

    let db: Db;
    let client: MongoClient;

    beforeAll(async () => {
      client = await MongoClient.connect(global.__MONGO_URI__)
      db = client.db(global.__MONGO_DB_NAME__)
    })

    afterAll(async () => {
      await client.close()
    })

    it('should create an employee', async () => {

      const mongoDBEmployeeRepository = new MongoDBEmployee(db)

      const createEmployeeUseCase = new CreateEmployeeUseCase(mongoDBEmployeeRepository)

      const mockEmployee = { nome: 'Irineu', idade: 28, cargo: 'Comediante' }
      const newEmployee = await createEmployeeUseCase.execute(mockEmployee)

      expect(newEmployee).toHaveProperty('id')
      expect(newEmployee.nome).toEqual(mockEmployee.nome)
      expect(newEmployee.idade).toEqual(mockEmployee.idade)
      expect(newEmployee.cargo).toEqual(mockEmployee.cargo)
      
    })

  })

})