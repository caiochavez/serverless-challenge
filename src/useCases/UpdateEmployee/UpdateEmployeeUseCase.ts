import { EmployeeRepository } from "../../repositories/Employee"
import { UpdateEmployeeDTO } from "./UpdateEmployeeDTO"

export class UpdateEmployeeUseCase {

  constructor (
    private employeeRepository: EmployeeRepository
  ) {}

  async execute (id: string, data: UpdateEmployeeDTO) {
    const employeeUpdated = await this.employeeRepository.update(id, data)

    return employeeUpdated
  }

}