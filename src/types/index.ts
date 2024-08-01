export type Videocard = {
  type: DeviceType.Videocard;
  name: string;
  price: number;
  exists: ExistType;
  article_number: string;
  img: string;
  currency: {
    name: string;
    short_name: string;
  }[];
  memory: string[];
  manufacturer: string;
};

export type Miner = {
  type: DeviceType.OldMiner | DeviceType.NewMiner;
  name: string;
  price: number;
  exists: ExistType;
  article_number: string;
  img: string;
  currency: {
    name: string;
    short_name: string;
  }[];
  energy_consumption: number;
  hash_power: number;
  hash_algorithm: string;
};
export enum DeviceType {
  Videocard = "Videocard",
  OldMiner = "OldMiner",
  NewMiner = "NewMiner",
}
export enum ExistType {
  exist = "exist",
  onOrder = "onOrder",
  notExist = "notExist",
}

export type Device = Videocard | Miner;
export type UserRole = "Admin" | "Customer";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tel: string;
  role: string;
  favourites: [Device] | [];
};

export type CallBack = { id: string; name: string; tel: string };

export type Order = {
  id: string;
  user_id?: string;
  date: string;
  isRegistered: boolean;
  user_name: string;
  user_tel: string;
  items: [Device];
};

// export type Favourites = [
//   {
//     id: string;
//     user_id: string;
//     items: [Device];
//   }
// ];
