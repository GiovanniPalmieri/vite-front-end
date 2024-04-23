import { useLocation } from 'react-router-dom';
import { getRepo } from '../api/ApiMockRepository';
import ProjectTableView from '../component/ProjectTableView';
import { ProjectEntity } from '../api/ApiEntities';
import TaskTable from '../component/ManagerView/Task/TaskTable';
import { useReducer } from 'react';
import { TaskAction } from '../component/ManagerView/Task/TaskActions';


export type EmployeePageAction =
    | TaskAction;

function reducer(state: ProjectEntity[], action: TaskAction): ProjectEntity[] {
    switch (action.type) {
        case 'DELETE_TASK':
            let newTaskList = action.task.fromProject.tasks.filter(t => t !== action.task)
            action.task.fromProject.tasks = newTaskList
            return [...state]

    }
}

export default function EmployView() {
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
                <ProjectTableView
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