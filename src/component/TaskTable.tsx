import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { ProjectEntity } from "../api/ApiEntities";
import TaskTableRow from "./TaskTableRow";
import { EmployeeViewAction } from "../pages/EmployView";


export interface TaskViewProps {
    projects: ProjectEntity[]
    dispatch: (action: EmployeeViewAction) => void;
}

export default function TaskView({ projects , dispatch}: TaskViewProps) {

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Descrizione</TableCell>
                        <TableCell align="left">Progetto</TableCell>
                        <TableCell align="left">Cancella</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(p => p.tasks).flat().map((task, key) => (
                        <TaskTableRow
                            key={key}
                            task={task}
                            dispatch={dispatch}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}