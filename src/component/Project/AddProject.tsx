import { Button, FormLabel, Stack, TextField } from "@mui/material";
import { EmployeeEntity, ProjectEntity } from "../../api/ApiEntities";
import React from "react";
import { ManagerPageAction } from "../../pages/ManagerPage";

interface AddProjectProps {
    manager: EmployeeEntity;
    projects: ProjectEntity[];
    dispatcher: (action: ManagerPageAction) => void;
}

export default function AddProject({ manager, projects, dispatcher }: AddProjectProps) {

    const [projectName, setProjectName] = React.useState("progetto");

    function handleSubmit() {
        const ids = projects.map(p => parseInt(p.id));
        let newId = Math.max(...ids) + 1
        if(Number.isNaN(newId) || newId === -Infinity){
            newId =1;
        }

        dispatcher({type: 'CREATE_PROJECT', project: {id: String(newId), name: projectName, assignedTo: [], manager: manager, tasks: []}})
    }

    return (
        <Stack className="addProjectViewStack">
            <h3>Aggiungi progetto</h3>
            <FormLabel>Nome</FormLabel>
            <TextField type="text" size="small" defaultValue="progetto"
                onChange={(e) => setProjectName(e.target.value)} />
            <Button onClick={handleSubmit}> Aggiungi </Button>
        </Stack>
    );
}