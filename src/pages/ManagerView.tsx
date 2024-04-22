import { useState } from "react";
import { EmployEntity, ProjectEntity, TaskEntity } from "../api/ApiEntities";
import { getRepo } from "../api/ApiMockRepository";
import EmployViewFromManager from "../component/ManagerView/EmployViewFromManager";
import { SelectChangeEvent } from "@mui/material";
import ProjectViewFromManager from "../component/ManagerView/ProjectViewFromManager";
import AddProjectView from "../component/ManagerView/AddProjectView";
import { useLocation } from "react-router-dom";
import TaskView from "../component/ManagerView/TaskView";
import AddTask from "../component/ManagerView/AddTask";

export default function ManagerView() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const managerId = searchParams.get('id');

    const [employs] = useState<EmployEntity[]>(getRepo().employs)
    const [projects, setProjects] = useState<ProjectEntity[]>(getRepo().projects)
    const [tasks, setTasks] = useState<TaskEntity[]>(getRepo().tasks)

    function handleProjectSelection(e: SelectChangeEvent<string>, employ: EmployEntity) {
        const project = projects.find(p => p.id === e.target.value)
        project?.assignedTo.push(employ)
        setProjects(projects.filter(() => true))
    }

    const handleProjectRemove = (projectToUnassignFromEmploy: ProjectEntity, employ: EmployEntity) => {

        const nextProjects = projects.map(p => {
            if (p.id === projectToUnassignFromEmploy.id) {
                const newProject: ProjectEntity = {
                    id: p.id,
                    name: p.name,
                    assignedTo: p.assignedTo.filter(e => e.id !== employ.id),
                    manager: p.manager
                }
                return newProject
            } else {
                return p;
            }
        });
        setProjects(nextProjects)
    };

    return (
        <div className="managerPage">
            <div className="employViewFromManager">
                <EmployViewFromManager
                    employs={employs}
                    handleProjectSelection={handleProjectSelection}
                    handleProjectRemove={handleProjectRemove}
                    projects={projects}
                />
            </div>
            <div className="projectViewFromManager">
                <ProjectViewFromManager
                    projects={projects}
                    setProjects={setProjects}
                    tasks={tasks}
                    setTasks={setTasks}
                />
            </div>
            <div className="addProjectView">
                <AddProjectView
                    projects={projects}
                    setProjects={setProjects}
                    manager={employs.find(e => e.id === managerId) || employs[0]}

                />
            </div>
            <div className="taskView">
                <TaskView 
                    tasks={tasks}
                    setTasks={setTasks} 
                    employs={employs}                
                    />
            </div>
            <div className="addTaskView">
                <AddTask 
                    projects={projects}                                   
                    />
            </div>
        </div>
    );
}