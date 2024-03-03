import { Timestamp } from "firebase/firestore";

export interface Users {
  id: number;
  email: string;
  name: string;
  // firestore에서 Date 대신 Timestamp 값으로 오기 때문에 임시로 Timestamp로 선언
  // lastLoggedIn: Date;
  lastLoggedIn: Timestamp;
  company: {
    id: number;
    name: string;
  };
}

export interface UsersProps {
  user: Users[];
  total_elements: number;
  total_pages: number;
  last: boolean;
  number: number;
  size: number;
  sort: object;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

export interface PostUserProps {
  email: string;
  password: string;
  repeat_password: string;
  name: string;
}

export interface UpdateUserProps {
  userId: number;
  name: string;
}
