import { Schema } from "mongoose";

export interface IAddress {
  country: string;
  suburb: string;
  postcode: string;
  streetname: string;
  unit?: string;
  buildingName?: string;
  addressLine1: string;
  addressLine2?: string;
}

export const AddressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  suburb: { type: String, required: true },
  postcode: { type: String, required: true },
  streetname: { type: String, required: true },
  unit: { type: String },
  buildingName: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
});