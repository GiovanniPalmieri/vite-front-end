export interface EmployeeEntity {
    id: string
    isManager: boolean
    name: string
}

export interface ProjectEntity {
    id: string
    name: string
    assignedTo: EmployeeEntity[]
    manager: EmployeeEntity
    tasks: TaskEntity[]
}

export interface TaskEntity {
    id: string
    name: string
    description: string
    fromProject: ProjectEntity
}