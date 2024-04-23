import { EmployeeEntity, ProjectEntity, TaskEntity } from "./ApiEntities";

let repo: ApiMockRepository
export function getRepo(): ApiMockRepository {
    if (repo === undefined) {
        repo = new ApiMockRepository();
    }
    return repo;
}

class ApiMockRepository {

    employs: EmployeeEntity[] = [
        { id: "1", name: "marco", isManager: true },
        { id: "2", name: "alessio", isManager: false },
        { id: "3", name: "enzo", isManager: false },
    ];

    projects: ProjectEntity[] = [
        { id: "1", name: "web app", assignedTo: [this.employs[1]], manager: this.employs[0], tasks: [] },
        { id: "2", name: "api", assignedTo: [this.employs[2]], manager: this.employs[0], tasks: [] },

    ];

    tasks: TaskEntity[] = [
        { id: "1", name: "testing", description: "fai i test", assignedTo: this.employs[0], fromProject: this.projects[0] },
        { id: "2", name: "fix 5", description: "sistema 5", assignedTo: this.employs[0], fromProject: this.projects[0] },
        { id: "3", name: "fix 45", description: "sistema 45", assignedTo: this.employs[1], fromProject: this.projects[1] },
        { id: "4", name: "robbe", description: "fai tante robbe", assignedTo: this.employs[1], fromProject: this.projects[1] },
    ];

    constructor(){
        this.projects[0].tasks = [this.tasks[0], this.tasks[1]]
        this.projects[1].tasks = [this.tasks[2], this.tasks[3]]
    }

    public login(username: string, password: string): EmployeeEntity | undefined {
        if (password !== "123") {
            return undefined;
        }
        return this.employs.find(e => e.name === username);
    }

    public getAssigendProjects(employId: string): ProjectEntity[] | undefined {
        return this.projects.filter(p => p.assignedTo.map(e => e.id).includes(employId));
    }

    public getProjectTasks(projectId: string): TaskEntity[] | undefined {
        return this.tasks.filter(t => t.fromProject.id === projectId);
    }
}