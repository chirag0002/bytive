import { API } from "./api"

export const UserAPI = {
    signin: (payload: { email: string, password: string }) => {
        return API.post('/api/v1/user/signin', payload)
    },

    signup: (payload: {
        name: string,
        email: string,
        password: string,
        avatar?: string,
        dateOfGrad: string,
        github: string,
        linkedin: string,
        website: string,
        twitter: string,
        bio: string
        hireable: boolean,
        seeking: string[],
        location: string,
        fieldOfInterest: string[],
        techStack: string[]
    }) => {
        return API.post('/api/v1/user/signup', payload)
    },

    getAllUsers: ({ fieldOfInterest, techStack, dateOfGrad, search }: { fieldOfInterest?: string; techStack?: string; dateOfGrad?: string; search?: string }) => {
        
        let queryString = '';

        if (fieldOfInterest) queryString += `fieldOfInterest=${fieldOfInterest}`;
        if (techStack) queryString += `&techStack=${techStack}`;
        if (search) queryString += `&search=${search}`;
        if (dateOfGrad) queryString += `&dateOfGrad=${dateOfGrad}`;
    
        return API.get(`/api/v1/user?${queryString}`);
    },

    getUser: (id: string) => {
        return API.get(`/api/v1/user/${id}`)
    },

    updateUser: (id: string, token: string, payload: {
        name?: string,
        email?: string,
        avatar?: string,
        dateOfGrad?: string,
        github?: string,
        linkedin?: string,
        website?: string,
        twitter?: string,
        bio?: string
        hireable?: boolean,
        seeking?: string[],
        location?: string,
        fieldOfInterest?: string[],
        techStack?: string[]
    }) => {
        return API.put(`/api/v1/user/${id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },
    
    deleteUser: (id: string, token: string) => {
        return API.delete(`/api/v1/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }
}