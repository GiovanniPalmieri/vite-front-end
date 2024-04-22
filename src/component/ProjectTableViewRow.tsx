import { TableRow, TableCell, Chip, Button } from "@mui/material";
import { ProjectEntity } from "../api/ApiEntities"

interface ProjectTableViewRowProps {
    project: ProjectEntity;
    mode: 'manager' | 'employee';
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
                    <Chip key={key} label={task.name} variant="outlined"
                        onDelete={() => console.log('hai provato a rimuovere la task')} />
                )}
            </TableCell>
            {mode === 'manager' &&
                <TableCell component="th" scope="row">
                    <Button variant="contained" onClick={() => console.log('hai provato a rimuovere il progetto')}>
                        Contrassegna come fatta </Button>
                </TableCell>}
        </TableRow>
    );
}