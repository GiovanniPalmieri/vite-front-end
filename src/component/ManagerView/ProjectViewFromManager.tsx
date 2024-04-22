import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { ProjectEntity, TaskEntity } from "../../api/ApiEntities";
import ProjectViewFromManagerRow from "./ProjectViewFromManagerRow";

export interface ProjectViewFromManagerProps {
    projects: ProjectEntity[];
    setProjects: (projects: ProjectEntity[]) => void;
    tasks: TaskEntity[];
    setTasks: (tasks: TaskEntity[]) => void;
}

export default function ProjectViewFromManager({ projects, setProjects , tasks , setTasks}:ProjectViewFromManagerProps){

    function handleTaskRemove(task: TaskEntity){
        setTasks(tasks.filter(t => t.id !== task.id))
    }

    function handleProjectRemove(project: ProjectEntity){
        setProjects(projects.filter(p => p.id !== project.id))
    }

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Manager</TableCell>
                        <TableCell align="left">Tasks</TableCell>
                        <TableCell align="left">Completa</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, key) => (
                        <ProjectViewFromManagerRow
                            key={key}
                            project={project}
                            manager={project.manager}
                            handleProjectRemove={handleProjectRemove}
                            tasks={tasks}
                            handleTaskRemove={handleTaskRemove}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}