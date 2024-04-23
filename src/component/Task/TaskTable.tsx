import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { TaskEntity } from "../../api/ApiEntities";
import TaskTableRow from "./TaskTableRow";
import { TaskAction } from "./TaskActions";


export interface TaskTableProps {
    tasks: TaskEntity[]
    dispatch: (action: TaskAction) => void;
}

export default function TaskTable({ tasks , dispatch}: TaskTableProps) {

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
                    {tasks.map((task, key) => (
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