import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SortQuery {
  @ApiProperty({
    description: `Field to sort`,
    type: String,
    required: false,
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: `Sort Ascending (ASC) or Descending (DESC)`,
    type: String,
    required: false,
  })
  @IsString()
  @IsIn(['DESC', 'ASC'])
  direction: 'DESC' | 'ASC';
}
export class BaseQuery {
  @ApiProperty({
    description: `Page number`,
    type: Number,
    required: false,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Transform((params) => parseInt(params.value) || 0, { toClassOnly: true })
  @IsNumber()
  @Min(0)
  page: number;

  @ApiProperty({
    description: `Number of records per page`,
    type: Number,
    required: false,
    minimum: 0,
    maximum: 50,
    default: 20,
  })
  @IsOptional()
  @Transform((params) => parseInt(params.value) || 10, { toClassOnly: true })
  @IsNumber()
  @Min(0)
  @Max(50)
  pageSize: number;

  @ApiProperty({
    description: `Sort by field`,
    required: false,
    isArray: true,
    example: 'name:ASC,age:DESC',
  })
  @IsOptional()
  @Transform(
    (params) =>
      params?.value?.split(',')?.map((s) =>
        plainToClass(SortQuery, {
          field: s?.split(':')?.[0],
          direction: s?.split(':')?.[1],
        }),
      ),
    { toClassOnly: true },
  )
  @Type(() => SortQuery)
  @ValidateNested({
    each: true,
  })
  sort: SortQuery[];
}
