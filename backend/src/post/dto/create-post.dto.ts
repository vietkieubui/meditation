import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';

enum categoriesType {
  ALL = 'all',
  ANXIOUS = 'anxious',
  SLEEP = 'sleep',
  KID = 'kid',
}
enum MusicType {
  STRESS_REDUCER = 'stressreducer',
  PERFORMANCE_IMPROVE = 'performanceimprove',
  BETTERS_SLEEP = 'bettersleep',
  PERSONAL_GROWTH = 'personalgrowth',
  ANXITY_DEDUCER = 'anxityreduce',
  HAPPINESS_INCREASE = 'happinessincrease',
}

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  audioUrl: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  artist: string;

  @IsString()
  @MaxLength(255)
  imageUrl: string;

  @IsString()
  @MaxLength(255)
  artwork: string;

  @IsArray()
  // @IsString({each: true})
  @ArrayMinSize(1)
  category: string[];

  @IsArray()
  // @IsString({each: true})
  @ArrayMinSize(1)
  type: string[];
}
