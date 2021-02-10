import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { formatPrice } from '../../utility/formatPrice';

const styles = {
    title: {
        textAlign: 'center',
        
    },
    normal: {
        width: '20%',
        maxWidth: '20%',
        marginRight: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
}

const CartProduct = props => {

    const { product, updateCart, type } = props;

    return (
        <div style={{ height: '100px', borderBottom: '1px solid lightgrey'}} className='w-100 d-flex align-items-center' key={product._id}>
            <div style={{ backgroundImage: `url(${product.images.length === 0 ? 'https://globalimpactnetwork.org/wp-content/themes/globalimpact/images/no-image-found-360x250.png' : product.images[0].url})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '10%', height: '100%'}}></div>
            <div style={styles.title, styles.normal}>{product.title}</div>
            <div style={styles.normal}>Color: {product.color}</div>
            {
                type === 'cart' ? (
                    <div style={styles.normal}><LeftOutlined onClick={() => updateCart(product, 'minus')} style={{ cursor: 'pointer' }} /> <span className='d-none d-lg-flex'>Quantity: </span> {product.qty} <RightOutlined onClick={() => updateCart(product, 'plus')} style={{ cursor: 'pointer'}} /></div>
                ) : (
                    <div style={styles.normal}> Quantity:  {product.qty}</div>
                )
            }
            
            <div style={styles.normal}>Price: ${formatPrice(product.price)} </div>
        </div>
    )
};

export default CartProduct;