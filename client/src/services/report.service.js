import api from "./api";

class ReportService {

    MessageReport = async (adminId) => {
        const response = await api
            .post("/report/message-list", {
                adminId
            });
        console.log("response.data", response)
        if (response.data) {
            return response.data;
        }
    }

}

export default new ReportService();