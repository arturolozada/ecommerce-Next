import React, { useEffect, useState } from 'react';
import { Loader }  from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import BasicLayout from '../../layouts/BasicLayout';
import { getProductPlatformApi, getTotalProductosPlatformApi } from '../../api/producto';
import ListaProductos from '../../components/ListaProductos/ListaProductos';
import Pagination from '../../components/Pagination/Pagination';

const limitPerPage = 20;

export default function Platform() {
    const {query} = useRouter();
    const [productos, setProductos] = useState(null);
    const [totalProductos, setTotalProductos] = useState(null);

    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if(!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage -limitPerPage;
    };

    useEffect(() => {
        (async () => {
            if(query.platform) {
                const response = await getProductPlatformApi(
                query.platform, limitPerPage, getStartItem()
                );
                setProductos(response);
            }
        })();
    }, [query]);

    useEffect(() => {
        (async () => {
            const response = await getTotalProductosPlatformApi(query.platform);
            setTotalProductos(response);
        })();
    }, [query])

    return (
        <BasicLayout className="categorias">
            {!productos && <Loader active>Cargando productos</Loader>}
            {productos && size(productos) === 0 && (
                <div><h3>No existen productos</h3></div>
            )}
            {size(productos) > 0 && (<ListaProductos productos={productos}/>)}

            {totalProductos ?
                <Pagination 
                    totalProductos={totalProductos}
                    page={query.page ? parseInt(query.page) : 1}
                    limitPerPage={limitPerPage}
                /> : null}
        </BasicLayout>
    )
}
