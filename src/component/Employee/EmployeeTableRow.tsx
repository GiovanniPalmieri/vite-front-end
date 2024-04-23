import { TableRow, TableCell, Chip, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { EmployeeEntity, ProjectEntity } from "../../api/ApiEntities";
import { EmployeeAction } from "./EmployeeActions";

export interface EmployeeTableRowProps {
    employee: EmployeeEntity
    projects: ProjectEntity[]
    dispatcher: (action: EmployeeAction) => void;
}

export function EmployeeTableRow({employee , projects , dispatcher} : EmployeeTableRowProps) {
    return (
        <TableRow key={employee.id} sx={{
            '&:last-child td, &:last-child th': {
                border: 0
            }
        }}>
            <TableCell component="th" scope="row">
                {employee.id}
            </TableCell>
            <TableCell component="th" scope="row">
                {employee.name}
            </TableCell>

            <TableCell component="th" scope="row">
                {projects.filter(p => p.assignedTo.includes(employee)).map((project, key) => <Chip label={project.name} onDelete={() => dispatcher({
                    type: 'UNASSIGN_PROJECT',
                    employee: employee,
                    project: project
                })} key={key} />)}
            </TableCell>
            <TableCell component="th" scope="row">
                <FormControl variant="standard" sx={{
                    m: 1,
                    minWidth: 120
                }} size="small">
                    <InputLabel id="demo-select-small-label">Aggiungi</InputLabel>
                    <Select labelId="select-project-label" id="select-project" label="" value='' onChange={e => dispatcher({
                        type: 'ASSIGN_PROJECT',
                        employee: employee,
                        projectId: e.target.value
                    })}>
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>
                        {projects.map((p, key) => <MenuItem key={key} value={p.id}>{p.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>
    );
}
