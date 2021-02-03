import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const ViewOpenFilters = props => {

    const search = useSelector(state => state.search);
    const [openFilters, setOpenFilters] = useState([]);

    useEffect(() => {
        const result = Object.keys(search).map(key => ({ type: key, value: search[key]}));
        setOpenFilters(result)
    }, [search])

    


    return (
        <div className='ml-5 w-25 d-flex'>

            {
                openFilters.map(el => {
                    if (el.value !== '' && !Array.isArray(el.value)) {
                        return (
                            <Button 
                                icon={<CloseOutlined />} 
                                type='text'
                                onClick={() => {
                                    
                                }}
                            >{el.type.substring(0, 1).toUpperCase() + el.type.substring(1, el.type.length).toLowerCase()}: {el.value}
                            </Button>
                        )
                    }
                })
            }
            
        </div>
    )
};

export default ViewOpenFilters;