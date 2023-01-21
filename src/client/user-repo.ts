export class UserRepo {
  create(hashPass: string, username: string, email: string) {}
  async findOne(email: string): Promise<any> {}
}
