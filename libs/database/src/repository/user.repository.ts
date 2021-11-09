import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async getAll(): Promise<UserEntity[]> {
    return this.find({
      relations: ['technology', 'job_role'],
      order: { id: 'DESC' },
    });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return this.findOne(id);
  }

  public async getUserByIdToUpdate(id: number): Promise<any> {
    const userEntity = await this.findOne(id, {
      relations: [
        'address',
        'bank_data',
        'profile',
        'data_professional',
        'collaborator_cost',
        'seniority',
      ],
    });

    if (!userEntity)
      throw new NotFoundException(`User with id ${id} doesnt exists`);
    return userEntity;
  }

  public async getUserByIdToEvent(id: number): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.bank_data', 'bank_data')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.data_professional', 'data_professional')
      .leftJoinAndSelect('user.technology', 'technology')
      .leftJoinAndSelect('user.job_role', 'job_role')
      .leftJoinAndSelect('user.seniority', 'seniority')
      .leftJoinAndSelect('user.collaborator_cost', 'collaborator_cost')
      .leftJoinAndSelect('user.userProject', 'userProject')
      .leftJoinAndSelect('userProject.project', 'project')
      .where('user.id = :id', { id })
      .getOne();
  }

  public async getAllUserByIdToEvent(userId: number[]): Promise<UserEntity[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.bank_data', 'bank_data')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.data_professional', 'data_professional')
      .leftJoinAndSelect('user.technology', 'technology')
      .leftJoinAndSelect('user.job_role', 'job_role')
      .leftJoinAndSelect('user.seniority', 'seniority')
      .leftJoinAndSelect('user.collaborator_cost', 'collaborator_cost')
      .leftJoinAndSelect('user.userProject', 'userProject')
      .leftJoinAndSelect('userProject.project', 'project')
      .where('user.id IN (:...userId)', { userId })
      .getMany();
  }

  public async getAllReportCollaborator(param: any): Promise<UserEntity[]> {
    const { name, contract_type, job_role, id, CPF, technology } = param;
    const query = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.bank_data', 'bank_data')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.data_professional', 'data_professional')
      .leftJoinAndSelect('user.technology', 'technology')
      .leftJoinAndSelect('user.job_role', 'job_role')
      .leftJoinAndSelect('user.seniority', 'seniority')
      .leftJoinAndSelect('user.collaborator_cost', 'collaborator_cost')
      .leftJoinAndSelect('user.cost', 'cos');

    if (technology)
      query.andWhere('technology.name = :technology', { technology });
    if (contract_type)
      query.andWhere('user.contract_type = :contract_type', { contract_type });
    if (name) query.andWhere('user.name = :name', { name });
    if (CPF) query.andWhere('user.CPF = :CPF', { CPF });
    if (job_role) query.andWhere(`job_role.name = :job_role`, { job_role });
    if (id) {
      const userId = id?.split(',');
      query.andWhere('user.id IN (:...userId)', { userId });
    }

    return query.getMany();
  }
}
