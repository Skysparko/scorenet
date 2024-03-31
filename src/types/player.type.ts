export interface IPlayer {
  pid?: string;
  tnid: string;
  name: string;
  image: string;
  sname: string;
  mobile: string;
  status: string;
}

export interface ICreatePlayerPayload {
  pid?: string;
  tnid: string;
  name: string;
  image: File | null;
  sname: string;
  mobile: string;
  status: string;
}

export interface IUpdatePlayerPayload extends ICreatePlayerPayload {}
