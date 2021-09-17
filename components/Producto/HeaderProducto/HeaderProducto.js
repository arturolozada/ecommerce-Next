import React, { useEffect, useState } from 'react';
import { BASE_PATH } from '../../../utils/constants';
import classNames from 'classnames';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { size }  from 'lodash';
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../../api/favorite';

export default function HeaderProducto(props) {
    const {producto} = props;
    const { title } = producto;
    
    const url1 = `${BASE_PATH}${producto.poster.url}`
    
    return (
        <Grid className="header-game">
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={url1} alt={title} fluid />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info producto={producto} />
            </Grid.Column>
        </Grid>
    );
}

function Info(props) {
    const { producto } = props;
    const { title, summary, price, descuento, url } = producto;
    const [isFavorite, setIsFavorite] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const { auth, logout } = useAuth();
    const { addProductCart } = useCart();

    useEffect(() => {
        if(auth) {
            (async () =>{
                const response = await isFavoriteApi(auth.idUser, producto.id, logout);
                if(size(response) > 0) setIsFavorite(true);
                else setIsFavorite(false);
            })();
            setReloadFavorite(false);
        }
    }, [producto, reloadFavorite]);


    const addFavorite = async () => {
        if(auth) {
            await addFavoriteApi(auth.idUser, producto.id, logout);
            setReloadFavorite(true);
        };
    };

    const removeFavorite = async () => {
        if(auth) {
            await deleteFavoriteApi(auth.idUser, producto.id, logout);
            setReloadFavorite(true);
        };
    };

    return (
        <>
            <div className="header-game__title">
                {title}
                <Icon name={isFavorite ? "heart" : "heart outline"} 
                className={classNames({like: isFavorite})} link
                onClick={isFavorite ? removeFavorite : addFavorite}
                />
            </div>
            <div className="header-game__delivery">Entrega en 24/48h</div>
            <div className="header-game__summary" dangerouslySetInnerHTML={{__html: summary}} />
            <div className="header-game__buy">
                <div className="header-game__buy-price">
                    <p>Precio de venta al público: ${price} </p>
                    <div className="header-game__buy-price-actions">
                        <p>{descuento}%  </p>
                        <p>${price + Math.floor(price * descuento) / 100} </p>
                    </div>
                </div>
                <Button className="header-game__buy-btn" onClick={() => addProductCart(url)}>Comprar</Button>
            </div>
        </>
    )
}