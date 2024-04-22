export interface EmployEntity {
    id: string
    isManager: boolean
    name: string
}

export interface ProjectEntity {
    id: string
    name: string
    assignedTo: EmployEntity[]
    manager: EmployEntity
}

export interface TaskEntity {
    id: string
    name: string
    description: string
    assignedTo: EmployEntity
    fromProject: ProjectEntity
}