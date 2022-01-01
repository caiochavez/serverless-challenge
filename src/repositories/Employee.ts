import { Employee } from '../entities/Employee'
import { UpdateEmployeeDTO } from '../useCases/UpdateEmployee/UpdateEmployeeDTO';

export interface ResponseMessage {
  message: string
}

export interface EmployeeRepository {

  create(employee: Employee): Promise<Employee>
  findOne(id: string): Promise<Employee>
  update(id: string, employeeToUpdate: UpdateEmployeeDTO): Promise<Employee>
  delete(id: string): Promise<ResponseMessage>

}