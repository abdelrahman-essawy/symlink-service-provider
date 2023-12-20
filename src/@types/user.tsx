export type UserType = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  phone: any;
  email: string;
  role: "CLIENT" | "PROVIDER" | "ADMIN";
  linkedin?: any;
  city?: ICity;
};

export type IProviderInfo = {
  user: UserType;
  info: string;
  certifcate: Certifcate[];
  projects: project[];
};

export type project = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
};

export interface Certifcate {
  id: string;
  file: string;
  type: string;
  name?: string;
}

export interface IUserProfile {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  account: string;
  username: string;
  linkedin: any;
  name: any;
  password: string;
  email: string;
  email_verified_at: any;
  phone: any;
  phone_verified_at: any;
  avatar: string;
  gender: any;
  fcm_token: any;
  language: string;
  is_active: boolean;
  city_id: any;
  roles: string[];
  city: ICity;
}
export interface ICountry {
  name: string;
  name_ar: string;
  name_en: string;
  id: string;

}
export interface ICity {
  name: string;
  name_ar: string;
  name_en: string;
  id: string;
  country_id: string;
  country: ICountry;
}
