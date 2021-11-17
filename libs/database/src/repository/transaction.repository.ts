import { EntityRepository, Repository } from "typeorm";
import { TransactionEntity } from "../entity";

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity>{}