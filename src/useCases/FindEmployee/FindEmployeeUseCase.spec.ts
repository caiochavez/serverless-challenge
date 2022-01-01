import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { FindEmployeeUseCase } from '../FindEmployee/FindEmployeeUseCase'
import { MongoClient, Db } from 'mongodb'

describe('Find Employee', () => {

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

    it('should find an employee', async () => {

      const mongoDBEmployeeRepository = new MongoDBEmployee(db)

      const createEmployeeUseCase = new CreateEmployeeUseCase(mongoDBEmployeeRepository)
      const findEmployeeUseCase = new FindEmployeeUseCase(mongoDBEmployeeRepository)

      const mockEmployee = { nome: 'Irineu', idade: 28, cargo: 'Comediante' }
      const newEmployee = await createEmployeeUseCase.execute(mockEmployee)

      const employeeFound = await findEmployeeUseCase.execute({ id: newEmployee.id })

      expect(employeeFound.nome).toEqual(newEmployee.nome)
      expect(employeeFound.idade).toEqual(newEmployee.idade)
      expect(employeeFound.cargo).toEqual(newEmployee.cargo)

    })

  })

})