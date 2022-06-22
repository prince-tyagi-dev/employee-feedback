interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  username: string;
  password: string;
  reviewerId?: string;
  review: string;
  feedback: string;
  isAdmin: boolean;
}

export default IEmployee;
