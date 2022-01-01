import { Employee } from "../../entities/Employee"
import { EmployeeRepository } from "../../repositories/Employee"
import { CreateEmployeeDTO } from "./CreateEmployeeDTO"

export class CreateEmployeeUseCase {

  constructor (
    private employeeRepository: EmployeeRepository
  ) {}

  async execute (data: CreateEmployeeDTO) {
    const newEmployee = new Employee(data)

    const employeeCreated = await this.employeeRepository.create(newEmployee)

    return employeeCreated
  }

}