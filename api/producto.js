import { BASE_PATH } from '../utils/constants';

export async function getLastProductApi(limit) {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = `_sort=createdAt:desc`
        const platform = "Kit de Belleza"
        const url = `${BASE_PATH}/productos?${limitItems}&${sortItem}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getProductPlatformApi( platform, limit, start ) {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = `_sort=createdAt:desc`;
        const startItems = `_start=${start}`;
        const url = `${BASE_PATH}/productos?platform.url=${platform}&${limitItems}&${sortItem}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTotalProductosPlatformApi(platform) {
    try {
        const url = `${BASE_PATH}/productos/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;        
    }
}

export async function getProductoByUrlApi(path) {
    try {
        const url = `${BASE_PATH}/productos?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;        
    }
}
export async function searchProductosApi(title) {
    try {
        const url = `${BASE_PATH}/productos?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;        
    }
}