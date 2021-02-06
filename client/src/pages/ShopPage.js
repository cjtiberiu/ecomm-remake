import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from '../utility/dbCategory';
import { getProducts, getSortedProducts, getFilteredProducts } from '../utility/dbProduct';
import { Skeleton } from 'antd';
import ProductCard from '../components/cards/ProductCard';
import PageControl from '../components/pagination/PageControl';
import FiltersArea from '../components/forms/FiltersArea';
import CartDrawer from '../components/navigation/CartDrawer';



const ShopPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [productsCount, setProductsCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const search = useSelector(state => state.search);

    useEffect(() => {
        setLoading(true);

        window.scrollTo(0, 0);

        // request filtered products from db every time the query object (redux.search state) gets new values
        // set a 500ms timeout before making the request (reducing the number of pointless requests)
        const timeoutID = setTimeout(() => {
            getFilteredProducts(search.query, search.price, search.category, search.stars, search.color, search.brand, currentPage)
                .then(res => {
                    setLoading(false);
                    setProducts(res.data.products)
                    setProductsCount(res.data.productsCount);
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                })
        }, 500)

        // clean when component unmounts

        return () => clearTimeout(timeoutID);
            
        
    }, [currentPage, search.query, search.price, search.category, search.stars, search.color, search.brand])

    useEffect(() => {
        setCurrentPage(1);
    }, [search.query, search.price, search.category, search.stars, search.color, search.brand])

    // get categories to set the name of the shop page
    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='mt-3'>

            <div className='row justify-content-center'>

                <div className='col-lg-2'>
                    <FiltersArea />
                </div>

                <div className='col-lg-10'>

                    <div className='row d-flex justify-content-lg-start justify-content-center'>
                        <h2>Products - {search.category === '' ? 'All' : categories.map(el => {
                        if (el._id === search.category) {
                            return el.name
                        }
                        })}</h2>
                        {/* <ViewOpenFilters /> */}
                    </div>

                    
                    <div className='row d-flex flex-wrap justify-content-lg-start justify-content-center'>
                    {
                        loading ? <Skeleton style={{width: 300, height: 409 }} active></Skeleton> : 
                        (
                            products.length === 0 ? 'No Products to show' : products.map(el => {
                                return <ProductCard key={el._id} type='user' product={el} />
                            })
                        )

                        
                    }
                    </div>   

                    <CartDrawer />   

                    <div className='row d-flex justify-content-center mt-3 pb-5'>
                        <PageControl currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} productsCount={productsCount} />
                    </div>
                
                </div>

            </div>
            
            
        </div>
    )
    
};

export default ShopPage;