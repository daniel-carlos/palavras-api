import { Group } from "@prisma/client";
import { IsArray, IsInstance } from "class-validator";

class GroupDto {
    id: number;
    name: string;
    description: string;
}

export class BatchCreateGroupDto {
    @IsArray()
    @IsInstance(GroupDto, { each: true })
    groups: Group[];
}
