import { TableRow, TableCell, Chip, Button } from "@mui/material";
import { ProjectEntity } from "../api/ApiEntities"
import { ComponentMode } from "./ComponentModes";

interface ProjectTableViewRowProps {
    project: ProjectEntity;
    mode: ComponentMode;
}

export default function ProjectTableViewRow({ project, mode }: ProjectTableViewRowProps) {
    return (
        <TableRow key={project.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

            <TableCell component="th" scope="row">
                {project.id}
            </TableCell>
            <TableCell component="th" scope="row">
                {project.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {project.manager.name}
            </TableCell>
            <TableCell>
                {project.tasks.map((task, key) =>
                    <Chip key={key} label={task.name} variant="outlined" />
                )}
            </TableCell>
            {mode === 'MANAGER' &&
                <TableCell component="th" scope="row">
                    <Button variant="contained" onClick={() => console.log('hai provato a rimuovere il progetto')}>
                        Contrassegna come fatta </Button>
                </TableCell>}
        </TableRow>
    );
}