export interface Vehicle {
  vehicle_id: number;
  vehicle_model: string;
  vehicle_type: string;
  seats?: number;
  price: number;
  rc_no?: string;
  password?:string;
}
export interface Customer {
  cust_id: number;
  cust_name: string;
  license_no: string;
  phone_no: string;
  cust_adhaar: string;
  pass: string;
}
export interface WatchLater { cust_id: number; vehicle_id: number; }
export interface Rental {
  cust_id: number; vehicle_id: number;
  rentdate: string; returndate: string; total_price?: number;
}