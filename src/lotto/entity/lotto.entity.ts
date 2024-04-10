import { IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LottoModel {
  @PrimaryColumn()
  @IsInt({ message: '회차 번호는 정수여야 합니다.' })
  @Min(1, { message: '회차 번호는 1 이상이어야 합니다.' })
  drwNo: number;

  @Column('bigint')
  @IsInt({ message: '총 판매액은 정수여야 합니다.' })
  @Min(0, { message: '총 판매액은 0 이상이어야 합니다.' })
  totSellamnt: number;

  @Column()
  @IsNotEmpty({ message: '추첨 날짜는 비어있으면 안 됩니다.' })
  @Type(() => Date)
  @IsDate({ message: '유효한 날짜여야 합니다.' })
  drwNoDate: Date;

  @Column('bigint')
  @IsInt({ message: '1등 당첨금액은 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨금액은 0 이상이어야 합니다.' })
  firstWinamnt: number;

  @Column()
  @IsInt({ message: '1등 당첨자 수는 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨자 수는 0 이상이어야 합니다.' })
  firstPrzwnerCo: number;

  @Column('bigint')
  @IsInt({ message: '1등 당첨금액 누적액은 정수여야 합니다.' })
  @Min(0, { message: '1등 당첨금액 누적액은 0 이상이어야 합니다.' })
  firstAccumamnt: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo1: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo2: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo3: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo4: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo5: number;

  @Column()
  @IsInt({ message: '당첨 번호는 정수여야 합니다.' })
  @Min(1, { message: '당첨 번호는 1 이상 45 이하이어야 합니다.' })
  drwtNo6: number;

  @Column()
  @IsInt({ message: '보너스 번호는 정수여야 합니다.' })
  @Min(1, { message: '보너스 번호는 1 이상 45 이하이어야 합니다.' })
  bnusNo: number;
}
