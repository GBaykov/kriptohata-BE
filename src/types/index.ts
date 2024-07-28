// export type RequestDevice = {
//   name: string;
//   price: number;
//   exists: boolean;
//   typeId: string;
//   info: string;
//   // img: string;
// };

// export interface IDeviceInfo {
//   id: string;
//   title: string;
//   description: string;
//   deviceId: string;
// }

export type Videocard = {
  type:DeviceType.Videocard;
  name: string;
  price: number;
  exists: boolean;
  article_nember: string;
  description:string;
  img: string;
  currency: [
    {
    name:string;
    short_name:string
  }
];
  memory: [string];
  manufacturer: string;
}

export type Miner={
  type:DeviceType.OldMiner | DeviceType.NewMiner;
  name: string;
  price: number;
  exists: boolean;
  article_nember: string;
  description:string;
  img: string;
  currency: [
    {
    name:string;
    short_name:string
  }
];
  hash_power:string;
  hash_algorithm:string
}
export enum DeviceType {
  Videocard = "Videocard",
  OldMiner = "OldMiner",
  NewMiner = "NewMiner",
  }
  
  export type  Device = Videocard | Miner

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  tel: string;
  role: string;
  orders: [
    order_id:string
  ];
  favourites_id: string
}







export type CallBack = { id: string, name: string, tel: string }

export type Order = {
  id: string,
  user_id?:string;
    date: string,
    user_name:string;
    user_tel:string;
    items: [  Device],
}



export type Favourites = [
  {
      user_id: string,
      items: [Device],
  }
] 