import { useState } from "react";
import { ProjectEntity } from "../../api/ApiEntities";
import { Stack, FormLabel, TextField, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export interface AddTaskProps {
    projects: ProjectEntity[]
}

export default function AddTask({ projects }: AddTaskProps) {
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
            <Select
                        labelId="select-project-label"
                        id="select-project"
                        label={taskProject?.name}
                        value={taskProject?.id}
                        onChange={(e) => handleTaskProjectAssignment(e)}
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        {projects.map((project, key) => <MenuItem key={key} value={project.id}>{project.name}</MenuItem>)}
                    </Select>
            <Button onClick={() => true}> Aggiungi </Button>
        </Stack>
    );
}