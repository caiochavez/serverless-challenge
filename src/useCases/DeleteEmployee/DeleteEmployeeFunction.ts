import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DeleteEmployeeUseCase } from './DeleteEmployeeUseCase'
import { MongoDBEmployee } from '../../repositories/implementations/MongoDBEmployee'

export async function handle (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

  const mongoDBEmployeeRepository = new MongoDBEmployee()

  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(mongoDBEmployeeRepository)

  const id = event.pathParameters.id

  try {
    const employeeDeleted = await deleteEmployeeUseCase.execute({ id })

    return {
      statusCode: 200,
      body: JSON.stringify(employeeDeleted)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message || 'Error on delete employee' })
    }
  }

}