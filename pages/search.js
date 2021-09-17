import React, { useEffect, useState } from 'react';
import {Loader} from 'semantic-ui-react'
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import {searchProductosApi} from '../api/producto';
import ListaProductos from '../components/ListaProductos/ListaProductos';


export default function search() {
    const [productos, setProductos] = useState(null);
    const { query } = useRouter();
        
    useEffect(() => {
       document.getElementById("search-game").focus();
    }, []);

    useEffect(() => {
        (async () => {
            if(size(query.query) > 0 ) {
                const response = await searchProductosApi(query.query);
                if(size(response) > 0 ) setProductos(response);
                else {
                    setProductos([]);
                }
            } else {
                setProductos([]);
            }
        })()
    }, [query])

    return (
        <BasicLayout className="search">
            {!productos && <Loader active>Buscando productos</Loader>}
            {productos && size(productos) === 0 && (
                <div><h3>No se han encontrado productos</h3></div>
            )}
            {size(productos) > 0 && <ListaProductos productos={productos} /> }
        </BasicLayout>
    )
}
