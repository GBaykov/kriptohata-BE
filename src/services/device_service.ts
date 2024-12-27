import { StatusCodes } from 'http-status-codes';
import { Device } from '../shemas/device_schema';
import { RequestError } from '../static/utils';
import { CreateDeviceDto, DeviceType } from '../types';

export const createDevice = async (device: CreateDeviceDto) => {
  if (device.device_type === DeviceType.Videocard) {
    if (
      !device.memory.length ||
      !device.manufacturer ||
      device.energy_consumption ||
      device.hash_power ||
      device.hash_algorithm
    ) {
      throw new RequestError(
        'The fields <energy_consumption>,<hash_power> and <hash_algorithm> required to create a miner/ The fields <memory> and <manufacturer> required to create a graphics card',
        StatusCodes.BAD_REQUEST,
      );
    } else {
      const new_device = new Device(device);
      await Device.create(new_device);
      return new_device;
    }
  }
  if (
    device.device_type === DeviceType.NewMiner ||
    device.device_type === DeviceType.OldMiner
  ) {
    if (
      !device.energy_consumption ||
      !device.hash_power ||
      !device.hash_algorithm ||
      device.memory ||
      device.manufacturer
    ) {
      throw new RequestError(
        'The fields <energy_consumption>,<hash_power> and <hash_algorithm> required to create a miner/ The fields <memory> and <manufacturer> required to create a graphics card',
        StatusCodes.BAD_REQUEST,
      );
    } else {
      console.log(device, 43);
      const new_device = new Device(device);
      await Device.create(new_device);
      return new_device;
    }
  }
};

export const findDevice = async (id: string) => {
  if (!id)
    throw new RequestError('Error: id is missing', StatusCodes.BAD_REQUEST);
  const device = await Device.findById(id);
  if (!device)
    throw new RequestError(
      `Error: can not find device by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  return device;
};

export const findAllDevices = async () => {
  return await Device.find();
};

export const updateDevice = async (id: string, device_dto: any) => {
  if (!id) {
    throw new RequestError(
      'Error in updateDevice: id is missing',
      StatusCodes.NOT_FOUND,
    );
  }
  const device = await Device.findById(id);
  if (!device) {
    throw new RequestError(
      `Error: can not find device by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }
  await Device.findByIdAndUpdate(id, { ...device_dto });
  return await Device.findById(id);
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
      `Error: can not find device by id ${id}`,
      StatusCodes.NOT_FOUND,
    );
  }
  await Device.findByIdAndDelete(id);
};
