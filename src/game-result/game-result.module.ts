import { Module } from '@nestjs/common';
import { GameResultService } from './game-result.service';
import { GameResultController } from './game-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultModel } from './entity/game-result.entity';
import { HttpModule } from '@nestjs/axios';
import { GameResultModelDetailModel } from './entity/game-result-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameResultModel, GameResultModelDetailModel]),
    HttpModule,
  ],
  controllers: [GameResultController],
  providers: [GameResultService],
})
export class GameResultModule {}
