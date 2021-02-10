import React from 'react';
import { Pagination } from 'antd';

const PageControl = props => {

    const { currentPage, setCurrentPage, productsPerPage, productsCount } = props;

    return (
        <Pagination 
            current={currentPage} 
            total={Math.ceil(productsCount / productsPerPage) * 10}
            onChange={value => setCurrentPage(value)}
        />
    )
};

export default PageControl;
