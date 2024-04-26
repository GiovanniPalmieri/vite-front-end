import { TableRow, TableCell, Chip, Button } from "@mui/material";
import { ProjectEntity } from "../../models/Models"
import { ComponentMode } from "../ComponentModes";
import { ProjectAction } from "./ProjectActions";

interface ProjectTableRowProps {
    project: ProjectEntity;
    mode: ComponentMode;
    dispatcher: (action: ProjectAction) => void;
}

export default function ProjectTableRow({ project, mode, dispatcher }: ProjectTableRowProps) {
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
                    <Button variant="contained" onClick={() =>
                        dispatcher({ type: 'DELETE_PROJECT', project: project })}>
                        Contrassegna come fatta </Button>
                </TableCell>}
        </TableRow>
    );
}