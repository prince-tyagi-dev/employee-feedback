interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  userName: string;
  password: string;
  reviewerId?: number;
  review: string;
  feedback: string;
  isAdmin: boolean;
}

export default IEmployee;
