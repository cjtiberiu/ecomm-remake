import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchFilter = props => {

    const { handleSearch, keyword, target } = props;

    return <Input placeholder={`Search ${target}`} prefix={<SearchOutlined />} value={keyword} onChange={handleSearch} />
};

export default SearchFilter;