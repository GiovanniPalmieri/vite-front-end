import { Button, TableCell, TableRow } from "@mui/material";
import { TaskEntity } from "../api/ApiEntities";
import { EmployeeViewAction } from "../pages/EmployView";

interface TaskViewRowProps {
    task: TaskEntity
    dispatch: (action: EmployeeViewAction) => void;
}

export default function TaskViewRow({ task, dispatch }: TaskViewRowProps) {

    return (
        <TableRow>
            <TableCell>
                {task.id}
            </TableCell>
            <TableCell>
                {task.name}
            </TableCell>
            <TableCell>
                {task.description}
            </TableCell>
            <TableCell>
                {task.fromProject.name}
            </TableCell>
            <TableCell>
                <Button variant="contained" onClick={() => 
                    dispatch({type: 'removeTask',task:task})}> Completata </Button>
            </TableCell>
        </TableRow>

    );
}