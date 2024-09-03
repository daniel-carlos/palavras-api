import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class BatchCreateWordsDTO {
    @IsArray()
    @IsString({ each: true })
    words: string[]
}