const users = [
  {
    name: 'Luidi',
    email: 'luidi@email.com'
  },
  {
    name: 'Matheus',
    email: 'matheus@email.com'
  }
]

export class User{
  static findAll(): Promise<any[]>{
    return Promise.resolve(users)
  }
}
