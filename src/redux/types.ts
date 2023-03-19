export type IUser = {
  id: string;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: Number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
};

export type IMutateUser = {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type IUserResponse = {
  status: string;
  note: IUser;
};

export type IUsersResponse = {
  status: string;
  results: number;
  notes: IUser[];
};
