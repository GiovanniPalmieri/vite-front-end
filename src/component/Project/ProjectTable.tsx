import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ProjectEntity } from '../../models/ApiEntities'
import ProjectTableRow from './ProjectTableRow';
import { ComponentMode } from '../ComponentModes';
import { ProjectAction } from './ProjectActions';


interface ProjectTableProps {
    projects: ProjectEntity[]
    mode: ComponentMode
    dispatcher: (action: ProjectAction) => void;
}

export default function ProjectTable({ projects, mode, dispatcher }: ProjectTableProps) {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Manager</TableCell>
                        <TableCell align="left">Tasks</TableCell>
                        {mode === 'MANAGER' && <TableCell align="left">Completa</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, key) => (
                        <ProjectTableRow
                            key={key}
                            project={project}
                            mode={mode}
                            dispatcher={dispatcher}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}