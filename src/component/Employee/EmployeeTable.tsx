import { EmployeeTableRow } from './EmployeeTableRow';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { EmployeeEntity, ProjectEntity } from "../../models/ApiEntities"
import { EmployeeAction } from "./EmployeeActions";

export interface EmployeeTable {
    employees: EmployeeEntity[];
    projects: ProjectEntity[];
    dispatcher: (action: EmployeeAction) => void;
}

export default function EmployeeTable({
    employees,
    projects,
    dispatcher
}: EmployeeTable) {

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Progetti</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <EmployeeTableRow
                            projects={projects}
                            employee={employee}
                            dispatcher={dispatcher}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}