import {
  CallBack,
  Device,
  DeviceType,
  ExistType,
  Favorite,
  Miner,
  Order,
  User,
  Videocard,
} from "../types";

export const videocard: Videocard = {
  id: "device_id",
  type: DeviceType.Videocard,
  name: "ASUS TUF Gaming GeForce RTX 3090",
  price: 560,
  exists: ExistType.onOrder,
  article_number: "123755",
  img: "string",
  currency: [
    {
      name: "Bitcoin SV",
      short_name: "BTC",
    },
    {
      name: "Litecoin",
      short_name: "LTC",
    },
  ],
  memory: ["12", "16", "18"],
  manufacturer: "Asus",
};

const old_miner: Miner = {
  id: "device_id",
  type: DeviceType.OldMiner,
  name: "ASIC Antminer S19 95T",
  price: 3100,
  exists: ExistType.exist,
  article_number: "001001",
  img: "string",

  currency: [
    {
      name: "Bitcoin",
      short_name: "BCH",
    },
    {
      name: "Bitcoin SV",
      short_name: "BTC",
    },
    {
      name: "BSH",
      short_name: "BSH",
    },
    {
      name: "Litecoin",
      short_name: "LTC",
    },
  ],
  energy_consumption: 3250,
  hash_power: 95,
  hash_algorithm: "SHA250",
};

const new_miner: Device = {
  id: "device_id",
  type: DeviceType.NewMiner,
  name: "ASIC Antminer S19 95T",
  price: 3500,
  exists: ExistType.exist,
  article_number: "001001",
  img: "string",

  currency: [
    {
      name: "Bitcoin",
      short_name: "BCH",
    },
    {
      name: "Bitcoin SV",
      short_name: "BTC",
    },
    {
      name: "BSH",
      short_name: "BSH",
    },
    {
      name: "Litecoin",
      short_name: "LTC",
    },
  ],
  energy_consumption: 3250,
  hash_power: 95,
  hash_algorithm: "SHA250",
};

const users: User[] = [
  {
    id: "Admin",
    name: "Admin",
    email: "admin@gmail.com",
    password: "Admin",
    tel: "+375 29 195-75-44",
    role: "Admin",
    favourites_id: "admin_favorite_id",
  },
];

const callbacks: CallBack[] = [
  { id: "string", name: "Admin", tel: "+375 29 195-75-44" },
];

const orders: Order[] = [
  {
    id: "string",
    user_id: "Admin",
    date: "01-08-2024",
    isAuthorized: true,
    user_name: "Admin",
    user_tel: "+375 29 195-75-44",
    items: [old_miner],
  },
];
const admin_fav: Favorite = {
  id: "admin_favorite_id",
  user_id: "Admin",
  items: [],
};
const favorites: Favorite[] = [admin_fav];

//

type DBType = {
  devices: Device[];
  users: User[];
  orders: Order[];
  callbacks: CallBack[];
  favorites: Favorite[];
};

const DB: DBType = {
  devices: [old_miner, new_miner, videocard],
  orders,
  users,
  callbacks,
  favorites,
};
export default DB;
