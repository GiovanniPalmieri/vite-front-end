import { useReducer } from "react";
import { EmployEntity, ProjectEntity, TaskEntity } from "../api/ApiEntities";
import { getRepo } from "../api/ApiMockRepository";
import EmployeeTable from "../component/ManagerView/EmployeeTable";
import { useLocation } from "react-router-dom";
import ProjectTableView from "../component/ProjectTableView";

interface ManagerPageState {
    employees: EmployEntity[]
    projects: ProjectEntity[]
    tasks: TaskEntity[]
}

export type ManagerPageAction =
    | { type: 'CREATE_PROJECT'; project: ProjectEntity }
    | { type: 'ASSIGN_PROJECT'; projectId: string ; employ: EmployEntity}
    | { type: 'UNASSIGN_PROJECT'; project: ProjectEntity ; employ: EmployEntity}
    | { type: 'DELETE_PROJECT'; project: ProjectEntity };


function reducer(state: ManagerPageState, action: ManagerPageAction): ManagerPageState {
    switch (action.type) {
        case 'CREATE_PROJECT':
            return { ...state }
        case 'DELETE_PROJECT':
            return { ...state }
        case 'ASSIGN_PROJECT':
            let project = state.projects.find(p => p.id === action.projectId)
            if (project === undefined) {
                console.log('project not found')
                return state;
            }
            project.assignedTo.push(action.employ)
            return { ...state }
        case 'UNASSIGN_PROJECT':

            action.project.assignedTo = action.project.assignedTo.filter(p => p.id !== action.employ.id)
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

export default function ManagerView() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const managerId = searchParams.get('id');

    const [currentState, dispatch] = useReducer(reducer, getStateFromDb())

    return (
        <div className="managerPage">
            <div className="employViewFromManager">
                <EmployeeTable
                    employs={currentState.employees}
                    dispatcher={dispatch}
                    projects={currentState.projects}
                />
            </div>
            <div className="projectViewFromManager">
                <ProjectTableView
                    mode={'MANAGER'}
                    projects={currentState.projects}
                />
            </div>
            {/* <div className="addProjectView">
                <AddProjectView
                    projects={projects}
                    setProjects={setProjects}
                    manager={employs.find(e => e.id === managerId) || employs[0]}

                />
            </div>
            <div className="taskView">
                <TaskTable
                    projects={projects}
                    dispatch={ }
                />
            </div>
            <div className="addTaskView">
                <AddTask
                    projects={projects}
                />
            </div> */}
        </div>
    );
}