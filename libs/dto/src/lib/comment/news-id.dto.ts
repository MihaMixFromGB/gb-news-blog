import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class NewsIdDto {
  @IsInt()
  @Type(() => Number)
  newsId!: number;
}
