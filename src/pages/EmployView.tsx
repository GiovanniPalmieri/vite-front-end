import { useLocation } from 'react-router-dom';
import { getRepo } from '../api/ApiMockRepository';

export default function EmployView() {
    const { state } = useLocation()

    const projects = getRepo().getAssigendProjects(state.user.id)
    const tasks = projects?.map(p => getRepo().getProjectTasks(p.id)).flat()

    function handleTaskDoneClick(event: object, taskId: string | undefined){
        console.log("task id: " + taskId)
    }

    return (
    <>
        <h3>Progetti</h3>
        <ul>
            {projects?.map((p,key) => <li key={key}>Nome: {p.name} Manager: {p.manager.name}</li>)}
        </ul>
        <h3>Task</h3>
        <ul>
            {tasks?.map((t,key) => <li key={key}>Nome: {t?.name} PRogetto: {t?.fromProject.name} Descrizione: {t?.description} 
                <button onClick={event => handleTaskDoneClick(event,t?.id)}> Contrassegna come completata</button></li>)}
        </ul>
    </>);
}