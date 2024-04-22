import { Button, Chip, TableCell, TableRow } from "@mui/material";
import { EmployEntity, ProjectEntity, TaskEntity } from "../../api/ApiEntities";

export interface ProjectViewFromManagerRowProps {
    project: ProjectEntity;
    manager: EmployEntity;
    handleProjectRemove: (project: ProjectEntity) => void;
    tasks: TaskEntity[];
    handleTaskRemove: (task: TaskEntity) => void;

}

export default function ProjectViewFromManagerRow({ project, manager,
    handleProjectRemove, tasks, handleTaskRemove }: ProjectViewFromManagerRowProps) {

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
                {manager.name}
            </TableCell>
            <TableCell>
                {tasks.filter(task => task.fromProject.id === project.id).map((task,key) =>
                    <Chip key={key} label={task.name} variant="outlined" onDelete={() => handleTaskRemove(task)} />
                )}
            </TableCell>
            <TableCell component="th" scope="row">
                <Button variant="contained" onClick={() => handleProjectRemove(project)}> Contrassegna come fatta </Button>
            </TableCell>
        </TableRow>
    );
}