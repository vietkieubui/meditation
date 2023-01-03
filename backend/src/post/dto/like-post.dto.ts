import { IsString, MaxLength } from "class-validator";

export class LikePostDto {
    @IsString()
    @MaxLength(255)
    post: string;
}