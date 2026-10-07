import type { InferSelectModel } from "drizzle-orm";
import { blog, release, setlists, shows, songs } from "./db/tables";

const API_URL = '/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        //throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
}

// Blog API
export const blogApi = {
    getAll: () => request<InferSelectModel<typeof blog>[]>('/blog'),
    create: (data: any) => request('/blog', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => request(`/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: number) => request(`/blog/${id}`, {
        method: 'DELETE',
    }),
};

// Release API
export const releaseApi = {
    getAll: () => request<InferSelectModel<typeof release>[]>('/release'),
    create: (data: any) => request('/release', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => request(`/release/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: number) => request(`/release/${id}`, {
        method: 'DELETE',
    }),
};

// Setlists API
export const setlistsApi = {
    getAll: () => request<InferSelectModel<typeof setlists>[]>('/setlists'),
    getByShowId: (showId: number) => request<any[]>(`/setlists/${showId}`),
    create: (data: any) => request('/setlists', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => request(`/setlists/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: number) => request(`/setlists/${id}`, {
        method: 'DELETE',
    }),
};

// Shows API
export const showsApi = {
    getAll: () => request<InferSelectModel<typeof shows>[]>('/shows'),
    create: (data: any) => request('/shows', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => request(`/shows/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: number) => request(`/shows/${id}`, {
        method: 'DELETE',
    }),
};

// Songs API
export const songsApi = {
    getAll: () => request<InferSelectModel<typeof songs>[]>('/songs'),
    getByReleaseId: (releaseId: number) => request<any[]>(`/songs/${releaseId}`),
    create: (data: any) => request('/songs', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    update: (id: number, data: any) => request(`/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    delete: (id: number) => request(`/songs/${id}`, {
        method: 'DELETE',
    }),
};
