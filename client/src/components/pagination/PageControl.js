import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';

const PageControl = props => {

    const { currentPage, setCurrentPage, productsPerPage, productsCount } = props;
    const products = useSelector(state => state.products);

    return (
        <Pagination 
            current={currentPage} 
            total={Math.ceil(productsCount / productsPerPage) * 10}
            onChange={value => setCurrentPage(value)}
        />
    )
};

export default PageControl;
