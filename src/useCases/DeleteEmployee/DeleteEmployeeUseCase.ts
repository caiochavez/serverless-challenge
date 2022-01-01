import { Employee } from "../../entities/Employee"
import { EmployeeRepository } from "../../repositories/Employee"
import { DeleteEmployeeDTO } from './DeleteEmployeeDTO'

export class DeleteEmployeeUseCase {

  constructor (
    private employeeRepository: EmployeeRepository
  ) {}

  async execute (data: DeleteEmployeeDTO) {
    const employeeDeleted = await this.employeeRepository.delete(data.id)

    return employeeDeleted
  }

}