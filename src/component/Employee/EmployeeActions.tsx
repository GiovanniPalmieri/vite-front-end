import { EmployeeEntity, ProjectEntity } from "../../models/ApiEntities";

export type EmployeeAction =
    | { type: 'ASSIGN_PROJECT'; projectId: string; employee: EmployeeEntity }
    | { type: 'UNASSIGN_PROJECT'; project: ProjectEntity; employee: EmployeeEntity }