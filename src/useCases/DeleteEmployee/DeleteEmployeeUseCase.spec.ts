import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { DeleteEmployeeUseCase } from './DeleteEmployeeUseCase'
import { MongoClient, Db } from 'mongodb'

describe('Delete Employee', () => {

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

    it('should delete an employee', async () => {

      const mongoDBEmployeeRepository = new MongoDBEmployee(db)

      const createEmployeeUseCase = new CreateEmployeeUseCase(mongoDBEmployeeRepository)
      const deleteEmployeeUseCase = new DeleteEmployeeUseCase(mongoDBEmployeeRepository)

      const mockEmployee = { nome: 'Irineu', idade: 28, cargo: 'Comediante' }
      const newEmployee = await createEmployeeUseCase.execute(mockEmployee)

      const employeeDeleted = await deleteEmployeeUseCase.execute({ id: newEmployee.id })

      expect(employeeDeleted).toHaveProperty('message')
      expect(employeeDeleted.message).toEqual('Employee successfully deleted')
      
    })

  })

})