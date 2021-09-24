import React, { useState, useEffect } from 'react';
import { Container, Menu, Grid, Icon, Label, Dropdown } from "semantic-ui-react";
import { map } from 'lodash';
import Link from "next/link";
import BasicModal from '../../Modal/BasicModal/BasicModal';
import Auth from '../../Auth/Auth';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { getMeApi } from '../../../api/user';
import { getPlatformApi } from '../../../api/platform';

export default function MenuWeb() {
    const [platforms, setPlatforms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("Inicia sesión");
    const [user, setUser] = useState(undefined);
    const { auth, logout } = useAuth();

    useEffect(() => { 
       (async () => {
           const response = await getMeApi(logout);
           setUser(response);
       })()
    }, [auth]);

    useEffect(() => {
        (async () => {
            const response = await getPlatformApi();
            setPlatforms(response || []);
        })()
    }, []);

    const onShowModal = () => setShowModal(true);
    const onCloseModal = () => setShowModal(false);

    return (
        <div className="menu">
            <Container fluid>
                <Grid>
                    <Grid.Column className="menu__left" width={6}>
                        <MenuPlatforms platforms={platforms} />
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={10}>
                        {user !== undefined && (
                            <MenuOptions 
                                onShowModal={onShowModal} 
                                user={user} 
                                logout={logout}
                            />
                        )}
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal 
                show={showModal} 
                setShow={setShowModal} 
                title={titleModal} size="small"
            >
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
            </BasicModal>
        </div>
    )
}

function MenuPlatforms(props) {
    const { platforms } = props;

    return (
        <Menu>
            {map(platforms, (platform) =>(
                <Link href={`/categories/${platform.url}`} key={platform._id}>
                    <Menu.Item as="a" name={platform.url}>
                        {platform.title}
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    )
}

function MenuOptions(props) {
    const { onShowModal, user, logout } = props;
    const { productsCart } = useCart();

    return (
        <Menu>
            <Menu.Item as="a">
                Nosotros
            </Menu.Item>
            <Menu.Item as="a">
                Visión
            </Menu.Item>
            <Menu.Item as="a">
                Misión
            </Menu.Item>
            <Menu.Item as="a">
                Aviso Legal
            </Menu.Item>
            {user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="dolly" />
                            Mis Pedidos
                        </Menu.Item>
                    </Link>
                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="heart outline" />
                            Favoritos
                        </Menu.Item>
                    </Link>
                    <Link href="/account">
                        <Menu.Item as="a">
                            <Icon name="user outline" />
                            {user.name} {user.lastname}
                        </Menu.Item>
                    </Link>
                    <Link href="/cart">
                        <Menu.Item as="a" className="m-0">
                            <Icon name="cart" />
                            {productsCart > 0 &&
                                (
                                    <Label color="red" floating circular>
                                        {productsCart}
                                    </Label>
                                )}
                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout} className="m-0">
                        <Icon name="power off" />
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item onClick={onShowModal}>
                    <Icon name="user outline" />
                    Mi cuenta
                </Menu.Item>
            )}
        </Menu>
    )
}

