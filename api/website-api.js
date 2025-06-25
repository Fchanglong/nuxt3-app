import request from "../utils/request.js";

export const getWebstiteApi = (websiteId) => {
    return request('/api/v2/ft_theme/waca')
}