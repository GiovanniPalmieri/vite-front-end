import { useEffect, useState } from 'react'
import { getRepo } from '../models/ApiMockRepository'
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { EmployeeRepository, IEmployee } from '../repository/EmployeeRepository';
import { ApiResponse } from '../repository/ApiResponse';
import { IProject, ProjectRepository } from '../repository/ProjectRepository';
import { RepositoriesSingleton } from '../repository/RepositoriesSingleton';
import { ITask } from '../repository/TaskRepository';


export default function Auth() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [employees, setEmployees] = useState<IEmployee[]>();

    useEffect(() => {

        RepositoriesSingleton.getInstance().employeeRepo.getMany(1, 5).then((response: ApiResponse<IEmployee[]>) => {
            console.log(response)
        });

        RepositoriesSingleton.getInstance().projectRepo.getMany(1, 5).then((response: ApiResponse<IProject[]>) => {
            console.log(response)
        });

        RepositoriesSingleton.getInstance().taskRepo.getMany(1, 5).then((response: ApiResponse<ITask[]>) => {
            console.log(response)
        });

    }, []);

    function handleSubmit() {
        setUsernameError(false)
        setPasswordError(false)

        if (username == '') {
            setUsernameError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }

        let user = getRepo().login(username, password);

        if (user === null) {
            setUsernameError(false)
            setPasswordError(false)
            return;
        }

        if (user?.isManager) {
            navigate(`/managerView?id=${user.id}`)
        } else {
            navigate("/employView", { state: { user: user } })
        }
    }

    return (
        <div className='formLogin'>

            <form autoComplete='off' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <TextField
                    label="Username"
                    onChange={e => setUsername(e.target.value)}
                    required
                    variant='outlined'
                    fullWidth
                    value={username}
                    error={usernameError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant='outlined'
                    fullWidth
                    type='password'
                    value={password}
                    error={passwordError}
                />
                <Button variant='outlined' type='submit'> Login</Button>
            </form>
        </div>
    );
}