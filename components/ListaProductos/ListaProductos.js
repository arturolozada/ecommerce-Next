import React from 'react';
import { BASE_PATH } from '../../utils/constants';
import { map } from 'lodash';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import useWindowSize from '../../hooks/useWindowSize';
import { breakpointUpSm, breakpointUpMd, breakpointUpLg } from '../../utils/breakpoint';

export default function ListaProductos(props) {
    const { productos } = props;
    const { width } = useWindowSize();

    const getColumnsRender = () => {
        switch (true) {
            case width > breakpointUpLg:
                return 5;
            case width > breakpointUpMd:
                return 3;
            case width > breakpointUpSm:
                return 2;
            default:
                return 1;
        };
    };

    return (
       <div className="list-games">
           <Grid>
                <Grid.Row columns={getColumnsRender()}>
                    {map(productos, (producto) => (
                    <Produ producto={producto}/>
                    ))}
                </Grid.Row>
           </Grid>
       </div>
    )
}

function Produ(props) {
    const {producto} = props;
    const url1 = `${BASE_PATH}${producto.poster.url}`
    return (
        <Grid.Column className="list-games__game">
            <Link href={`/${producto.url}`}>
                <a>
                    <div className="list-games__game-poster">
                        <Image src={url1} alt={producto.title} />
                        <div className="list-games__game-poster-info">
                            {producto.descuento ? (
                                <span className="discount">{producto.descuento}%</span
                            >) : (<span />)}
                            <span className="price">${producto.price}</span>
                        </div>
                    </div>
                    <h2>{producto.title}</h2>
                </a>
            </Link>
        </Grid.Column>
    )
};