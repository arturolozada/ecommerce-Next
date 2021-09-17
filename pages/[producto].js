import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import { useRouter }  from 'next/router';
import { getProductoByUrlApi } from '../api/producto';
import HeaderProducto from '../components/Producto/HeaderProducto/HeaderProducto';
import TabsProducto from '../components/Producto/TabsProducto/TabsProducto';
import Seo from '../components/Seo';

export default function Producto() {
    const [ producto, setProducto ] = useState(null);
    const  { query }  = useRouter();
    
    useEffect(() => {
        (async () => {
            const response = await getProductoByUrlApi(query.producto);
            setProducto(response);
        })()
    }, [query])
    
    if(!producto) return null;
    return (
        <BasicLayout className="producto">
            <Seo title={producto.title} />
            <HeaderProducto producto={producto} />
            <TabsProducto producto={producto} />
        </BasicLayout>
    )
    
}
