import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateEmployeeUseCase } from './UpdateEmployeeUseCase'
import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'

export async function handle (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

  const mongoDBEmployeeRepository = new MongoDBEmployee()

  const updateEmployeeUseCase = new UpdateEmployeeUseCase(mongoDBEmployeeRepository)

  const id = event.pathParameters.id
  const { nome, idade, cargo } = JSON.parse(event.body)

  try {
    const employeeUpdated = await updateEmployeeUseCase.execute(id, { nome, idade, cargo })

    return {
      statusCode: 200,
      body: JSON.stringify(employeeUpdated)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message || 'Error on update employee' })
    }
  }

}