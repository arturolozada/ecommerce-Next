import React, { useEffect, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { getProductoByUrlApi } from '../api/producto';
import useCart from '../hooks/useCart';
import SummaryCart from '../components/Cart/SummaryCart/SummaryCart';
import AddressShipping from '../components/Cart/AddressShipping/AddressShipping';
import Payment from '../components/Cart/Payment/Payment';

export default function Cart() {
    const {getProductsCart} = useCart();
    const products = getProductsCart();
    
    return !products ? <EmptyCart /> : <FullCart products={products} />
}

function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el Carrito</h2>
        </BasicLayout>
    )
}

function FullCart(props) {
    const {products} = props;
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        (async () => {
            const productsTemp = [];
            for await (const product of products) {
                const data = await getProductoByUrlApi(product);
                productsTemp.push(data);                
            };
            setProductsData(productsTemp);
        })();
        setReloadCart(false);
    }, [reloadCart])


    return (
        <BasicLayout className="empty-cart">
            <SummaryCart products={productsData} setReloadCart={setReloadCart} reloadCart={reloadCart} />
            <AddressShipping setAddress={setAddress} />
            {address && <Payment products={productsData} address={address} />}
        </BasicLayout>
    )
}