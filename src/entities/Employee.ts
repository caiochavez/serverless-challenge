export class Employee {

  public readonly id: string
  public nome: string
  public idade: number
  public cargo: string

  constructor (props: Omit<Employee, 'id'>) {
    Object.assign(this, props)
  }

}