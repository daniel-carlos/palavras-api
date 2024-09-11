import { Group } from "@prisma/client";
import { IsArray, IsInstance } from "class-validator";

import { Group as GroupModel } from "@prisma/client";
import { GroupsModule } from "../groups.module";

export class BatchCreateGroupDto {
    @IsArray()
    // @IsInstance(GroupsModule, { each: true })
    groups: Group[];
}
