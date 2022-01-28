import axios from "axios";

const app = axios.create({
    baseURL: "http://localhost:8081/api",
})

class services {

    login(user) {
        return app.post('/login', {
            username: user.username,
            password: user.password
        })
    }

    logout() {
        localStorage.removeItem('UserData');
        localStorage.removeItem('Token');
        return app.post('/logout');
    }

    register(user) {
        return app.post('/register', user)
    }

    // board service functions

    getUserBoards(data) {
        let token = localStorage.getItem('Token')
            // app.defaults.headers.common['Authorization'] = `Bearer ${token}`
        console.log("inside get User Boards", data)
        return app.get("/Users/" + data + "/Boards", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    createNewBoard(data) {
        let token = localStorage.getItem('Token')
        console.log("inside create new board function")
        return app.post("/Users/" + data.usrId + "/Boards", data.board, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deleteUserBoard(data) {
        let token = localStorage.getItem('Token')
        console.log("inside delete user board function")
        return app.delete("/Users/Boards/" + data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // boardlist service functions

    getBoardLists(data) {
        let token = localStorage.getItem('Token')
        console.log("inside get Board Lists")
        return app.get("/Boards/" + data + "/Lists", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    createNewBoardList(data) {
        let token = localStorage.getItem('Token')
        console.log("inside create new list function")
        return app.post("/Boards/" + data.boardId + "/Lists", data.list, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


    deleteBoardList(data) {
        let token = localStorage.getItem('Token')
        console.log("inside delete board list function")
        return app.delete("/Boards/Lists/" + data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // task service functions

    createNewTask(data) {
        let token = localStorage.getItem('Token')
        console.log("inside create new task function")
        return app.post("/Lists/" + data.listId + "/Tasks", data.task, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateTaskStatus(data) {
        let token = localStorage.getItem('Token')
        console.log("inside update task status function")
        return app.put("/Task/" + data.ListID, data.task, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    uploadFile(TaskId, data) {
        try {
            console.log("inside upload files attached to task")
            return app.post('/tasks/' + TaskId + '/attachments', data, {
                onUploadProgress: uploadEvent => {
                    console.log("Uploading ....", Math.round(uploadEvent.loaded / uploadEvent.total * 100), "%")
                }
            });
        } catch (error) {
            console.log('error :', error)
        }
    }

    deleteAttachedFile(fileID) {
        try {
            console.log("inside delete file attached to task")
            return app.delete('/tasks/attachments/' + fileID);
        } catch (error) {
            console.log('error :', error)
        }
    }

    downloadAttachedFile(fileID) {
        try {
            console.log("inside delete file attached to task")
            return app.get('/tasks/attachments/' + fileID);
        } catch (error) {
            console.log('error :', error)
        }
    }

    getTaskAttachedFiles(TaskID) {
        try {
            console.log("inside get files attached to task", TaskID)
            return app.get('/tasks/' + TaskID + '/attachments');
        } catch (error) {
            console.log('error :', error)
        }
    }
}

export default new services()