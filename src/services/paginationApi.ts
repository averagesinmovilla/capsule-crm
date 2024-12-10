import axios from '@/lib/axios'
import { PaginatedResponse } from '@/types/pagination.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// TODO: pasar esto a clase y extender
export const fetchPaginatedData = async <T>(endpoint: string, pageIndex: string, pageSize: string): Promise<PaginatedResponse<T>> => {
    const { data } = await axios.get<PaginatedResponse<T>>(`${API_BASE_URL}/${endpoint}?page=${pageIndex + 1}&perPage=${pageSize}`);
    return data;
};
