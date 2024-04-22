import { useLocation } from 'react-router-dom';
import { getRepo } from '../api/ApiMockRepository';
import ProjectTableView from '../component/ProjectTableView';
import { ProjectEntity, TaskEntity } from '../api/ApiEntities';
import TaskTable from '../component/TaskTable';
import { useReducer } from 'react';

export interface EmployeeViewAction {
    type: 'removeTask'
    task: TaskEntity
}

function reducer(state: ProjectEntity[], action: EmployeeViewAction): ProjectEntity[] {
    switch (action.type) {
        case 'removeTask':
            let newTaskList = action.task.fromProject.tasks.filter( t => t !== action.task)
            action.task.fromProject.tasks = newTaskList
            return [ ...state ]

    }
}

export default function EmployView() {
    const { state } = useLocation()

    const tempProject = getRepo().getAssigendProjects(state.user.id)
    if (tempProject === undefined) {
        return <h1>Non hai progetti assegnati</h1>
    }

    const [projectStates, dispatch] = useReducer(reducer, tempProject)

    function handleTaskDoneClick(event: object, taskId: string | undefined) {
        console.log("task id: " + taskId)
    }

    return (
        <>
            <h3>Progetti</h3>
            <ul>
                <ProjectTableView mode={{ mode: 'employee' }} projects={projectStates} />
            </ul>
            <h3>Task</h3>
            <ul>
                <TaskTable dispatch={dispatch} projects={projectStates} />
            </ul>
        </>
    );
}