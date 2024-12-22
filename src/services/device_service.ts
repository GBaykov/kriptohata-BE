import { StatusCodes } from 'http-status-codes';
import { Device } from '../shemas/device_schema';
import { RequestError } from '../static/utils';

export const createDevice = async (device: any) => {
  //   if (
  //     !device ||
  //     !device.article_number ||
  //     !device.currency ||
  //     !device.name ||
  //     !device.type ||
  //     !device.price
  //   )
  //     throw new RequestError('Error: can not create device', 404);
  const new_device = new Device(device);
  await Device.create(new_device);
  return new_device;
};

export const findDevice = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const device = await Device.findById(id);
  if (!device)
    throw new RequestError(
      'Error: can not find device by id',
      StatusCodes.NOT_FOUND,
    );
  return device;
};

export const findAllDevices = async () => {
  const devices = await Device.find();
  return devices;
};

export const updateDevice = async (id: string, device_dto: any) => {
  // if (!device_dto) {
  //   throw new RequestError(
  //     'Error: Device whith such id not found',
  //     StatusCodes.BAD_REQUEST,
  //   );
  // }
  const device = await Device.findById(id);
  if (!device) {
    throw new RequestError('Error: Device whith such id not found', 404);
  }

  await Device.findByIdAndUpdate(id, { ...device_dto });
  const updated_device = await Device.findById(id);
  return updated_device;
};

export const deleteDevice = async (id: string) => {
  if (!id) {
    throw new RequestError(
      'Error in deleteDevice: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const device = await Device.findById(id);
  if (!device) {
    throw new RequestError(
      'Error while delete device: no device with such id',
      StatusCodes.NOT_FOUND,
    );
  }
  await Device.findByIdAndDelete(id);
};
