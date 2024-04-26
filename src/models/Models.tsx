
export interface Manager {
    id: number
    name: string
}

export interface Employee{
    id: string
    name: string
}

export interface Project{
    id: string
    name: string
    employeeIds: number[]
    managerId: number 
    taskIds: number[]
}

export interface TaskEntity {
    id: string
    name: string
    description: string
    projectId: number 
}