import { Button, TableCell, TableRow } from "@mui/material";
import { TaskEntity } from "../../models/Models";
import { TaskAction } from "./TaskActions";

interface TaskTableRowProps {
    task: TaskEntity
    dispatch: (action: TaskAction) => void;
}

export default function TaskTableRow({ task, dispatch }: TaskTableRowProps) {

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
                    dispatch({type: 'DELETE_TASK', task:task})}> Completata </Button>
            </TableCell>
        </TableRow>

    );
}