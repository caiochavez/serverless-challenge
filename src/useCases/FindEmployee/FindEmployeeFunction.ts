import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { FindEmployeeUseCase } from './FindEmployeeUseCase'
import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'

export async function handle (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

  const mongoDBEmployeeRepository = new MongoDBEmployee()

  const findEmployeeUseCase = new FindEmployeeUseCase(mongoDBEmployeeRepository)

  const id = event.pathParameters.id

  try {
    const employeeFound = await findEmployeeUseCase.execute({ id })

    return {
      statusCode: 200,
      body: JSON.stringify(employeeFound)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message || 'Error on find employee' })
    }
  }

}