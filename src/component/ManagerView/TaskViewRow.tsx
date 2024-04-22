import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from "@mui/material";
import { EmployEntity, TaskEntity } from "../../api/ApiEntities";
import { useState } from "react";

interface TaskViewRowProps {
    task: TaskEntity;
    employs: EmployEntity[];
    handleTaskRemoved: (task: TaskEntity) => void;
}



export default function TaskViewRow({ task, handleTaskRemoved  , employs}: TaskViewRowProps) {

    const [selectedEmployee,setSelectedEmployee] = useState<EmployEntity>(task.assignedTo) 

    function handleTaskProjectAssignment(e: SelectChangeEvent<string>, task: TaskEntity){
        let employ = employs.find(employ => employ.id === e.target.value);
        if ( employ === undefined){
            return;
        }
        task.assignedTo = employ
        setSelectedEmployee(employ)
    }

    return (
        <TableRow>
            <TableCell>
                {task.id}
            </TableCell>
            <TableCell>
                {task.name}
            </TableCell>
            <TableCell>
                {task.fromProject.name}
            </TableCell>
            <TableCell>
                <Button variant="contained" onClick={() => handleTaskRemoved(task)}> Cancella </Button>
            </TableCell>
            <TableCell>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Assegna</InputLabel>
                    <Select
                        labelId="select-project-label"
                        id="select-project"
                        label={selectedEmployee.name}
                        value={selectedEmployee.id}
                        onChange={(e) => handleTaskProjectAssignment(e, task)}
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        {employs.map((employ, key) => <MenuItem key={key} value={employ.id}>{employ.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>

    );
}