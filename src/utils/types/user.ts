export interface Address {
  street: string;
  city: string;
  zipcode: string;
  suite: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: Address;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserTableProps {
  users: User[];
  onRowClick: (user: User) => void;
}

export interface UserTableCellProps {
  children: React.ReactNode;
  width?: string;
}

