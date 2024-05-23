import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UsersModel } from '../../users/entity/users.entity';
import { BaseModel } from '../../common/entity/base.entity';

@Entity('save_number')
export class SaveNumberModel extends BaseModel {
  @Column({ name: 'lotto_number1' })
  lottoNumber1: number;

  @Column({ name: 'lotto_number2' })
  lottoNumber2: number;
  @Column({ name: 'lotto_number3' })
  lottoNumber3: number;
  @Column({ name: 'lotto_number4' })
  lottoNumber4: number;
  @Column({ name: 'lotto_number5' })
  lottoNumber5: number;
  @Column({ name: 'lotto_number6' })
  lottoNumber6: number;

  @ManyToOne(() => UsersModel, (user) => user.saveNumbers)
  @JoinColumn({ name: 'user_id' })
  userId: number;
}
