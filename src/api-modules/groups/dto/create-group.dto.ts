import { Group } from "@prisma/client";
import { IsInstance, IsObject, IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}
