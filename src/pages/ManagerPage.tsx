import { useReducer } from "react";
import { EmployeeEntity, ProjectEntity, TaskEntity } from "../models/ApiEntities";
import { getRepo } from "../models/ApiMockRepository";
import EmployeeTable from "../component/Employee/EmployeeTable";
import { useLocation } from "react-router-dom";
import ProjectTable from "../component/Project/ProjectTable";
import AddProject from "../component/Project/AddProject";
import TaskTable from "../component/Task/TaskTable";
import { TaskAction } from "../component/Task/TaskActions";
import AddTask from "../component/Task/AddTask";
import { EmployeeAction } from "../component/Employee/EmployeeActions";
import { ProjectAction } from "../component/Project/ProjectActions";

interface ManagerPageState {
    employees: EmployeeEntity[]
    projects: ProjectEntity[]
    tasks: TaskEntity[]
}

export type ManagerPageAction =
    | ProjectAction
    | EmployeeAction
    | TaskAction;


function reducer(state: ManagerPageState, action: ManagerPageAction): ManagerPageState {
    switch (action.type) {
        case 'CREATE_PROJECT':
            state.projects.findIndex(p => p.id === action.project.id) === -1 ?
                state.projects.push(action.project) : {}
            return { ...state }
        case 'DELETE_PROJECT':
            state.projects = state.projects.filter(p => p !== action.project)
            return { ...state }
        case 'ASSIGN_PROJECT':
            let project = state.projects.find(p => p.id === action.projectId)
            if (project === undefined) {
                console.log('project not found')
                return state;
            }
            project.assignedTo.push(action.employee)
            return { ...state }
        case 'DELETE_TASK':
            state.tasks = state.tasks.filter(t => t !== action.task)
            return { ...state }
        case 'ADD_TASK':
            if (state.tasks.findIndex(t => t.id === action.task.id) !== -1) {
                return state
            }
            state.tasks.push(action.task)
            state.projects.find(p => p === action.task.fromProject)?.tasks.push(action.task)
            return { ...state }
        case 'UNASSIGN_PROJECT':
            action.project.assignedTo = action.project.assignedTo.filter(p => p.id !== action.employee.id)
            return { ...state }
        default:
            return { ...state }
    }
}

function getStateFromDb(): ManagerPageState {
    return {
        employees: getRepo().employs,
        projects: getRepo().projects,
        tasks: getRepo().tasks
    }
}

export default function ManagerPage() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const managerId = searchParams.get('id');

    const [currentState, dispatch] = useReducer(reducer, getStateFromDb())

    return (
        <div className="managerPage">
            <div className="employViewFromManager">
                <EmployeeTable
                    employees={currentState.employees}
                    dispatcher={dispatch}
                    projects={currentState.projects}
                />
            </div>
            <div className="projectViewFromManager">
                <ProjectTable
                    mode={'MANAGER'}
                    projects={currentState.projects}
                    dispatcher={dispatch}
                />
            </div>
            <div className="addProjectView">
                <AddProject
                    projects={currentState.projects}
                    manager={currentState.employees.find(e => e.id === managerId) || currentState.employees[0]}
                    dispatcher={dispatch}

                />
            </div>
            <div className="taskView">
                <TaskTable
                    tasks={currentState.tasks}
                    dispatch={dispatch}
                />
            </div>
            <div className="addTaskView">
                <AddTask
                    projects={currentState.projects}
                    dispatcher={dispatch}
                />
            </div>
        </div>
    );
}