import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ProjectEntity } from '../api/ApiEntities'
import ProjectTableViewRow from './ProjectTableViewRow';


interface ProjectTableViewProps {
    projects: ProjectEntity[]
    mode: 'manager' | 'employee'
}

export default function ProjectTableView({ projects, mode }: ProjectTableViewProps) {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Id</TableCell>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Manager</TableCell>
                        <TableCell align="left">Tasks</TableCell>
                        {mode === 'manager' && <TableCell align="left">Completa</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, key) => (
                        <ProjectTableViewRow
                            key={key}
                            project={project}
                            mode='employee'
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}