import { Role } from "libs/guards/enum/role.enum";

export class BodyRequestLogDto{
  type?: Role;
  headers: object;
  method: string;
  url: string;
  timestamp: Date;
  body: Object ;
}