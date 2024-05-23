import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { SaveNumberModel } from '../../save-number/entity/saveNumber.entity';
import { RolesEnum } from '../const/roles.const';
import { BaseModel } from '../../common/entity/base.entity';

@Entity('users')
export class UsersModel extends BaseModel {
  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => SaveNumberModel, (saveNumber) => saveNumber.userId)
  @JoinColumn({ name: 'save_numbers' })
  saveNumbers: SaveNumberModel[];

  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;
}
