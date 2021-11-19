import { EntityRepository, Repository } from "typeorm";
import { LogEntity } from "../entity";

@EntityRepository(LogEntity)
export class LogRepository extends Repository<LogEntity>{}