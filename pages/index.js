import React, { useState, useEffect } from 'react';
import { Loader }  from 'semantic-ui-react';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout';
import { getLastProductApi } from '../api/producto';
import ListaProductos from '../components/ListaProductos/ListaProductos';
import Seo from '../components/Seo';

export default function Home() {
  const [productos, setProductos] = useState(null);
    
  useEffect(() => {
    (async () => {
      const response = await getLastProductApi(50);
      if(size(response) > 0) setProductos(response);
      else setProductos([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo />
      {!productos && <Loader active>Cargando Productos</Loader>}
      {productos && size(productos) === 0 && (<div>sin juegos</div>)}
      {size(productos) > 0 && <ListaProductos productos={productos}/>}
    </BasicLayout>
  )
}