import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'
import { CreateEmployeeUseCase } from '../CreateEmployee/CreateEmployeeUseCase'
import { UpdateEmployeeUseCase } from '../UpdateEmployee/UpdateEmployeeUseCase'
import { MongoClient, Db } from 'mongodb'

describe('Update Employee', () => {

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

    it('should update an employee', async () => {

      const mongoDBEmployeeRepository = new MongoDBEmployee(db)

      const createEmployeeUseCase = new CreateEmployeeUseCase(mongoDBEmployeeRepository)
      const updateEmployeeUseCase = new UpdateEmployeeUseCase(mongoDBEmployeeRepository)

      const mockEmployee = { nome: 'Irineu', idade: 28, cargo: 'Comediante' }
      const newEmployee = await createEmployeeUseCase.execute(mockEmployee)

      const dataToUpdate = { cargo: 'Humorista' }
      const employeeUpdated = await updateEmployeeUseCase.execute(newEmployee.id, dataToUpdate)

      expect(employeeUpdated.cargo).toEqual(dataToUpdate.cargo)
      expect(employeeUpdated.idade).toEqual(newEmployee.idade)
      expect(employeeUpdated.nome).toEqual(newEmployee.nome)

    })

  })

})