import { TableRow, TableCell, Chip, SelectChangeEvent } from "@mui/material";
import { EmployeeEntity, ProjectEntity } from "../../api/ApiEntities";
import { EmployeeAction } from "./EmployeeActions";
import SelectProjectComponent from "../SelectProjectComponent";

export interface EmployeeTableRowProps {
    employee: EmployeeEntity
    projects: ProjectEntity[]
    dispatcher: (action: EmployeeAction) => void;
}

export function EmployeeTableRow({ employee, projects, dispatcher }: EmployeeTableRowProps) {

    function onSelection(e: SelectChangeEvent<string>) {
        dispatcher({
            type: 'ASSIGN_PROJECT',
            employee: employee,
            projectId: e.target.value
        });
    }

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
                <SelectProjectComponent
                    items={projects.map(p => { return { value: p.id, view: p.name }; })}
                    selectionHint="Aggiungi"
                    onSelection={onSelection}
                    defaultLabel=""
                    defaultValue=""
                />
            </TableCell>
        </TableRow>
    );
}
