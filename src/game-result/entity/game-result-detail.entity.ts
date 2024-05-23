import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('game_result_detail')
export class GameResultModelDetailModel {
  @PrimaryColumn({ name: 'draw_number' })
  drawNumber: number;

  @PrimaryColumn()
  rank: number;

  @Column({ name: 'total_Prize', type: 'bigint' })
  totalPrize: number;

  @Column()
  winners: number;

  @Column({ name: 'prize_per_person', type: 'bigint' })
  prizePerPerson: number;
}
