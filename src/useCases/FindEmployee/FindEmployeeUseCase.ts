import { Employee } from "../../entities/Employee"
import { EmployeeRepository } from "../../repositories/Employee"
import { FindEmployeeDTO } from './FindEmployeeDTO'

export class FindEmployeeUseCase {

  constructor (
    private employeeRepository: EmployeeRepository
  ) {}

  async execute (data: FindEmployeeDTO) {
    const employeeFound = await this.employeeRepository.findOne(data.id)

    return employeeFound
  }

}