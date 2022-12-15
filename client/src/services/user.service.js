import api from "./api";

class UserService {

    DashboardDetails = async (adminId) => {
        const response = await api.post("/user/DashboardDetails", {adminId});
        // console.log("response.data",response)
        if (response.data)return response.data;
        return [];
    };

    UserList = async (adminId) => {
        const response = await api
            .post("/user/list", {
                adminId
            });
        // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    }

    
    UserDelete = async (userId, adminId) => {
        const response = await api
            .post("/user/delete", {
                userId,
                adminId
            });
        // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    }

    UserUpdate = async (userId, adminId, fullName, displayName, email, whatsappNumber, privateNote, capturedData, avatarUrl) => {
        const response = await api
            .post("/user/update", {
                userId, adminId, fullName, displayName, email, whatsappNumber, privateNote, capturedData, avatarUrl,
            });
        // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    }

    UserCreate = async (adminId, fullName, displayName, email, whatsappNumber, privateNote, avatarUrl) => {
        const response = await api
            .post("/user/create", {
                adminId, fullName, displayName, email, whatsappNumber, privateNote, avatarUrl,
            });
        // // console.log("response",response)
        if (response.data) {
            return response.data;
        }
    }

    //   logout() {
    //     TokenService.removeUser();
    //   }
    //   register(username, email, password) {
    //     return api.post("/auth/signup", {
    //       username,
    //       email,
    //       password
    //     });
    //   }
    //   getCurrentUser() {
    //     return TokenService.getUser();
    //   }
}

export default new UserService();