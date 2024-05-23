import { IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('game_result')
export class GameResultModel {
  @PrimaryColumn({ name: 'draw_no' })
  @IsInt({ message: '회차 번호는 정수여야 합니다.' })
  @Min(1, { message: '회차 번호는 1 이상이어야 합니다.' })
  drawNo: number;

  @Column({ name: 'total_selling_amount', type: 'bigint' })
  @IsInt({ message: '총 판매액은 정수여야 합니다.' })
  @Min(0, { message: '총 판매액은 0 이상이어야 합니다.' })
  totalSellingAmount: number;

  @Column({ name: 'draw_no_date' })
  @IsNotEmpty({ message: '추첨 날짜는 비어있으면 안 됩니다.' })
  @Type(() => Date)
  @IsDate({ message: '유효한 날짜여야 합니다.' })
  drawNoDate: Date;

  @Column({ name: 'first_winning_amount', type: 'bigint' })
  @IsInt({ message: '1등 당첨금액은 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨금액은 0 이상이어야 합니다.' })
  firstWinningAmount: number;

  @Column({ name: 'first_prize_winner_count' })
  @IsInt({ message: '1등 당첨자 수는 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨자 수는 0 이상이어야 합니다.' })
  firstPrizeWinnerCount: number;

  @Column({ name: 'first_accumulated_amount', type: 'bigint' })
  @IsInt({ message: '1등 당첨금액 누적액은 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨금액 누적액은 0 이상이어야 합니다.' })
  firstAccumulatedAmount: number;

  @Column({ name: 'ball_no1' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo1: number;

  @Column({ name: 'ball_no2' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo2: number;

  @Column({ name: 'ball_no3' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo3: number;

  @Column({ name: 'ball_no4' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo4: number;

  @Column({ name: 'ball_no5' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo5: number;

  @Column({ name: 'ball_no6' })
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  ballNo6: number;

  @Column({ name: 'bonus_ball_no' })
  @IsInt({ message: '보너스 번호는 정수여야 합니다.' })
  @Min(1, { message: '보너스 번호는 1 이상 45 이하이어야 합니다.' })
  bonusBallNo: number;
}
