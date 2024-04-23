import { EmployEntity, ProjectEntity } from "../../api/ApiEntities";

export type EmployeeAction =
    | { type: 'ASSIGN_PROJECT'; projectId: string; employ: EmployEntity }
    | { type: 'UNASSIGN_PROJECT'; project: ProjectEntity; employ: EmployEntity }