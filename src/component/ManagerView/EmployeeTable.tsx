import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { EmployEntity, ProjectEntity } from "../../api/ApiEntities"
import { ManagerPageAction } from "../../pages/ManagerView";

export interface EmployeeTable {
    employs: EmployEntity[];
    projects: ProjectEntity[];
    dispatcher: (action: ManagerPageAction) => void;
}

export default function EmployeeTable({
    employs,
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
                    {employs.map((employ) => (
                        <TableRow
                            key={employ.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {employ.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {employ.name}
                            </TableCell>

                            <TableCell component="th" scope="row">
                                {projects.filter(p => p.assignedTo.includes(employ)).map((project, key) => (
                                    <Chip label={project.name} onDelete={() =>
                                        dispatcher({ type: 'UNASSIGN_PROJECT', employ: employ, project: project })} key={key} />
                                ))}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Aggiungi</InputLabel>
                                    <Select
                                        labelId="select-project-label"
                                        id="select-project"
                                        label=""
                                        value=''
                                        onChange={(e) => dispatcher({ type: 'ASSIGN_PROJECT', employ: employ, projectId: e.target.value })}
                                    >
                                        <MenuItem value="None">
                                            <em>None</em>
                                        </MenuItem>
                                        {projects.map((p, key) => <MenuItem key={key} value={p.id}>{p.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}