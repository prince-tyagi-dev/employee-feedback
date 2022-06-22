import { ILogin } from "../Common";

interface IEmployee extends ILogin {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  reviewerId?: string;
  review: string;
  feedback: string;
  isAdmin: boolean;
}

export default IEmployee;
