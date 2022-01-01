import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase'
import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'

export async function handle (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

  const mongoDBEmployeeRepository = new MongoDBEmployee()

  const createEmployeeUseCase = new CreateEmployeeUseCase(mongoDBEmployeeRepository)

  const { nome, idade, cargo } = JSON.parse(event.body)

  try {
    const employeeCreated = await createEmployeeUseCase.execute({ nome, idade, cargo })

    return {
      statusCode: 201,
      body: JSON.stringify(employeeCreated)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message || 'Error on create employee' })
    }
  }

}