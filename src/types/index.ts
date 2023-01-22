export type RequestDevice = {
  name: string;
  price: number;
  exists: boolean;
  typeId: string;
  info: string;
  // img: string;
};

export interface IDeviceInfo {
  id: string;
  title: string;
  description: string;
  deviceId: string;
}
