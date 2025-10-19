// DTOs são interfaces simples que definem a "forma" dos dados
interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export default ICreateUserDTO;
