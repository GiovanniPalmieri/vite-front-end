import { useLocation } from 'react-router-dom';
import { getRepo } from '../models/ApiMockRepository';
import ProjectTable from '../component/Project/ProjectTable';
import { ProjectEntity } from '../models/ApiEntities';
import TaskTable from '../component/Task/TaskTable';
import { useEffect, useReducer } from 'react';
import { TaskAction } from '../component/Task/TaskActions';
import { RepositoriesSingleton } from '../repository/RepositoriesSingleton';
import { ProjectAction } from '../component/Project/ProjectActions';
import { ApiResponse } from '../repository/ApiResponse';
import { IProject } from '../repository/ProjectRepository';


export type EmployeePageAction =
    | TaskAction;

export default function EmployView() {

    function reducer(state: ProjectEntity[], action: TaskAction | ProjectAction): ProjectEntity[] {
        switch (action.type) {
            case 'SET_PROJECTS':
                return action.projects;
            case 'DELETE_TASK':
                let newTaskList = action.task.fromProject.tasks.filter(t => t !== action.task)
                action.task.fromProject.tasks = newTaskList
                return [...state]
            default:
                return state

        }
    }

    useEffect(() => {
        RepositoriesSingleton.getInstance().projectRepo.getMany(1, 1).then((response: ApiResponse<IProject[]>) => {
            if (response.data !== undefined){
            dispatch({ type: 'SET_PROJECTS', projects: response.data.map(ip => {
                return { id: ip.id, name: ip.name,  }
            }) });
            }
        })
    });

    const { state } = useLocation()

    const tempProject = getRepo().getAssigendProjects(state.user.id)
    if (tempProject === undefined) {
        return <h1>Non hai progetti assegnati</h1>
    }

    const [projectStates, dispatch] = useReducer(reducer, tempProject)

    return (
        <>
            <h3>Progetti</h3>
            <ul>
                <ProjectTable
                    mode={'EMPLOYEE'}
                    projects={projectStates}
                    dispatcher={() => undefined}
                />
            </ul>
            <h3>Task</h3>
            <ul>
                <TaskTable dispatch={dispatch} tasks={projectStates.flatMap(p => p.tasks)} />
            </ul>
        </>
    );
}