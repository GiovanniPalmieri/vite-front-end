import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { EmployEntity, TaskEntity } from "../../api/ApiEntities";
import TaskViewRow from "./TaskViewRow";


export interface TaskViewProps {
    employs: EmployEntity[]
    tasks: TaskEntity[]
    setTasks: (tasks: TaskEntity[]) => void;
}

export default function TaskView({ tasks, setTasks, employs}: TaskViewProps) {

    function handleTaskRemoved(task : TaskEntity){
        setTasks(tasks.filter(t => t.id !== task.id))
    }


    

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Progetto</TableCell>
                        <TableCell align="left">Cancella</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, key) => (
                        <TaskViewRow
                            key={key}
                            task={task}
                            handleTaskRemoved={handleTaskRemoved}
                            employs={employs}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}