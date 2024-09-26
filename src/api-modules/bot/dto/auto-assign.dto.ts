import { Group, Word } from "@prisma/client"
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInstance, IsInt, IsOptional, ValidateNested } from "class-validator"
import { GenProvider } from "src/types/GenAI";

export class WordDto {
    id: number;
    text: string;
}

export class GroupDto {
    id: number;
    name: string;
    description: string;
}

export class AutoAssignDTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WordDto)
    words: Word[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GroupDto)
    groups: Group[]

    @IsEnum(GenProvider)
    provider: GenProvider
}





// enum GenProvider {
//     "gemini",
//     "groq"
// }

// export class RandomAssignDTO {
//     @IsInt()
//     numberOfWords: number

//     @IsEnum(GenProvider)
//     provider: GenProvider
// }