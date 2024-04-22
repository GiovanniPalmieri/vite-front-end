import { useReducer, useState } from "react";
import { EmployEntity, ProjectEntity, TaskEntity } from "../api/ApiEntities";
import { getRepo } from "../api/ApiMockRepository";
import EmployViewFromManager from "../component/ManagerView/EmployViewFromManager";
import { SelectChangeEvent } from "@mui/material";
import AddProjectView from "../component/ManagerView/AddProjectView";
import { useLocation } from "react-router-dom";
import AddTask from "../component/ManagerView/AddTask";
import ProjectTableView from "../component/ProjectTableView";
import TaskTable from "../component/TaskTable";

interface ManagerPageState {
    employees: EmployEntity[]
    projects: ProjectEntity[]
    tasks: TaskEntity[]
}

export type ManagerPageAction =
    | { type: 'CREATE_PROJECT'; project: ProjectEntity }
    | { type: 'DELETE_PROJECT'; project: ProjectEntity };


function reducer(state: ManagerPageState, action: ManagerPageAction){
    switch(action.type){

    }
}

export default function ManagerView() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const managerId = searchParams.get('id');

    const [currentState, dispatch] = useReducer()

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
                <ProjectTableView
                    mode={{ mode: 'manager' }}
                    projects={projects}
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
                <TaskTable
                    projects={projects}
                    dispatch={ }
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