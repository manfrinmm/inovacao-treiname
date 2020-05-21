interface Request {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    cpf,
    rg,
    phone,
    password,
  }: Request): Promise<void> {
    console.log("User");
  }
}
