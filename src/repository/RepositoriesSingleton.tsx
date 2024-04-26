import { EmployeeRepository } from "./EmployeeRepository";
import { ProjectRepository } from "./ProjectRepository";
import { TaskRepository } from "./TaskRepository";

export class RepositoriesSingleton {
    private static instance: RepositoriesSingleton

    public readonly employeeRepo : EmployeeRepository;
    public readonly projectRepo : ProjectRepository;
    public readonly taskRepo : TaskRepository;
    
    
    private constructor(){
        this.employeeRepo = new EmployeeRepository()
        this.projectRepo = new ProjectRepository()
        this.taskRepo = new TaskRepository()
    } 

    public static getInstance():RepositoriesSingleton {
        if (!RepositoriesSingleton.instance){
            RepositoriesSingleton.instance = new RepositoriesSingleton();
        }
        return RepositoriesSingleton.instance;
    }
}