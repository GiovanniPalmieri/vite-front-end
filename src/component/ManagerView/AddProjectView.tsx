import { Button, FormLabel, Stack, TextField } from "@mui/material";
import { EmployEntity, ProjectEntity } from "../../api/ApiEntities";
import React from "react";

interface AddProjectViewProps {
    manager: EmployEntity;
    projects: ProjectEntity[];
    setProjects: (projects: ProjectEntity[]) => void;
}

export default function AddProjectView({ manager, projects, setProjects }: AddProjectViewProps) {

    const [projectName, setProjectName] = React.useState("progetto");

    function handleSubmit() {
        const ids = projects.map(p => parseInt(p.id));
        let newId = Math.max(...ids) + 1
        if(Number.isNaN(newId) || newId === -Infinity){
            newId =1;
        }

        setProjects([...projects,{id: String(newId), name: projectName, assignedTo: [], manager: manager}] );
        console.log(`aggiunto progetto ${projectName}`)
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