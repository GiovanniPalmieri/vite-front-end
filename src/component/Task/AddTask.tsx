import { useState } from "react";
import { ProjectEntity } from "../../models/ApiEntities";
import { Stack, FormLabel, TextField, Button, SelectChangeEvent } from "@mui/material";
import { TaskAction } from "./TaskActions";
import SelectProjectComponent from "../SelectProjectComponent";

export interface AddTaskProps {
    projects: ProjectEntity[]
    dispatcher: (action: TaskAction) => void;
}

export default function AddTask({ projects , dispatcher}: AddTaskProps) {
    const [taskName, setTaskName] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("")
    const [taskProject, setTaskProject] = useState<ProjectEntity | undefined>()

    function handleTaskProjectAssignment(e: SelectChangeEvent<string>){
        let project = projects.find(p => p.id === e.target.value)
        if (project == undefined){
            return;
        }

        setTaskProject(project);
    }

    function handleTaskAdd(){
        if (taskProject === undefined) return;
        const ids = projects.flatMap(p => p.tasks.map(t => parseInt(t.id)));
        const taskId = Math.max(...ids) + 1
        dispatcher({type: 'ADD_TASK', task: 
            {id: String(taskId), name: taskName, description: taskDescription, fromProject: taskProject}})
    }

    return (
        <Stack className="addProjectViewStack">
            <h3>Aggiungi task</h3>
            <FormLabel>Nome</FormLabel>
            <TextField type="text" size="small" value={taskName}
                onChange={(e) => setTaskName(e.target.value)} />
            <FormLabel>Descrizione</FormLabel>
            <TextField type="text" size="small" value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)} />
            <FormLabel>Progetto</FormLabel>
            <SelectProjectComponent 
                items={projects.map(p => {return {value: p.id, view: p.name}})}
                onSelection={handleTaskProjectAssignment}
                selectionHint="Seleziona Progetto"
                defaultLabel=""
                defaultValue=""
            />
            <Button onClick={handleTaskAdd}> Aggiungi </Button>
        </Stack>
    );
}