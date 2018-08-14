export class Image {
  _type: string;
  value: Array<Value>;
}

export class Value{
  url: string;
  height: number;
  width: number;
  base64encoding: string;
}
