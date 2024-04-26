import { ProjectEntity } from "../../models/Models";

export type ProjectAction =
    | { type: 'CREATE_PROJECT'; project: ProjectEntity }
    | { type: 'DELETE_PROJECT'; project: ProjectEntity }
    | {type: 'SET_PROJECTS'; projects: ProjectEntity[]}