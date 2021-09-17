import React, { useEffect, useState } from 'react';
 import { Loader } from 'semantic-ui-react';
import { size, forEach } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getFavoritoApi } from '../api/favorite';
import useAuth from '../hooks/useAuth';
import ListaProductos from '../components/ListaProductos';
import Seo from '../components/Seo';

export default function wishlist() {
    const [productos, setPoductos] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavoritoApi(auth.idUser, logout);
            if(size(response) > 0 ) {
                const productosList = [];
                forEach(response, (data) => {
                    productosList.push(data.producto)
                });
                setPoductos(productosList);
            } else {
                setPoductos([]);
            }
        })();
    }, []);

    return (
        <BasicLayout className="wishlist">
            <Seo />
            <div className="wishlist__block">
                <div className="title">Lista de Favoritos</div>
                <div className="data">
                    {!productos && <Loader active>Cargando productos</Loader>}
                    {productos && size(productos) === 0 && (
                        <div className="data__not-found"><h3>No existen productos en favoritos </h3></div>
                    )}
                    {size(productos) > 0 && (<ListaProductos productos={productos}/>)}
                </div>
            </div>
        </BasicLayout>
    )
}
