import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../../../utility/dbCategory';
import { getSubCategories } from '../../../utility/dbSub';
import { Form, Input, InputNumber, Radio } from 'antd';

import ImageUpload from '../../../components/forms/ImageUpload';

import { createProduct } from '../../../utility/dbProduct';
import { toast } from 'react-toastify';

// Ant design
import { Select } from 'antd';
const { Option } = Select;

const colors = ['Silver', 'Brown', 'Black', 'White', 'Blue'];
const brands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus', 'Dell', 'Other'];


const ProductCreate = props => {

    const [form] = Form.useForm();

    const user = useSelector(state => state.user);
    const history = useHistory();

    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        subCategories: [],
        quantity: '',
        images: [],
        shipping: 'Yes',
        color: '',
        brand: ''
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res.data.categories))
            .catch(err => console.log(err));
        getSubCategories()
            .then(res => setSubs(res.data.sub))
            .catch(err => console.log(err));
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            createProduct(user.token, product)
                .then(() => {
                    history.push('/admin/products');
                    toast.success('Product created');
                })
                .catch(err => toast.error(err.response.data.message))
        }
    }

    

    return (
        <div className='col-md-10'>

            <Form
                form={form}
                layout='vertical'
                onSubmit={handleSubmit}
            >

                <Form.Item label='Product Title'>
                    <Input value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} />
                </Form.Item>


                <Form.Item label='Product Description'>
                    <Input.TextArea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} />
                </Form.Item>


                <Form.Item label='Product Price'>
                    <InputNumber value={product.price} onChange={value => setProduct({ ...product, price: value })} />
                </Form.Item>


                <Form.Item label='Product category'>
                    <Select
                        style={{ width: 200 }}
                        name='category'
                        placeholder="Select a category"
                        optionFilterProp="name"
                        onChange={value => setProduct({ ...product, category: value })}
                    >
                        {
                            !categories ? null : (
                                categories.map(el => {
                                    return <Option key={el._id} value={`${el._id}`}>{el.name}</Option>
                                })
                            )
                        }
                    </Select>
                </Form.Item>


                <Form.Item label='Product sub-category'>
                    <Select
                        mode='multiple'
                        style={{ width: 200 }}
                        placeholder="Select a sub-category"
                        optionFilterProp="children"
                        onChange={value => setProduct({ ...product, subs: value })}
                    >
                        {
                            !subs ? null : (
                                subs.map(el => el.parent === product.category ? <Option key={el._id} value={`${el._id}`}>{el.name}</Option> : null)
                            )
                        }
                    </Select>
                </Form.Item>


                <Form.Item label='Product Quantity'>
                    <InputNumber value={product.quantity} onChange={value => setProduct({ ...product, quantity: value })} />
                </Form.Item>
                

                <Form.Item label="Shipping">
                    <Radio.Group defaultValue={product.shipping} onChange={e => setProduct({ ...product, shipping: e.target.value })}>
                        <Radio.Button value="Yes">Yes</Radio.Button>
                        <Radio.Button value="No">No</Radio.Button>
                    </Radio.Group>
                </Form.Item>     


                <Form.Item label='Product color'>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Select a color"
                        optionFilterProp="children"
                        onChange={value => setProduct({ ...product, color: value })}
                    >
                        {

                            colors.map(el => {
                                return <Option key={el} value={`${el}`}>{el}</Option>
                            })
                        }
                    </Select>
                </Form.Item>   


                <Form.Item label='Product brand'>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Select a brand"
                        optionFilterProp="children"
                        onChange={value => setProduct({ ...product, brand: value })}
                    >
                        {

                            brands.map(el => {
                                return <Option key={el} value={`${el}`}>{el}</Option>
                            })
                        }
                    </Select>
                </Form.Item> 

                <Form.Item label='Upload Images'>
                    <ImageUpload values={product} setValues={setProduct} setLoading={setLoading} loading={loading} />
                </Form.Item>
                
               
                <button onClick={handleSubmit} className='btn btn-outline-dark mt-3' type='primary'>Create product</button>

            </Form>


        </div>
    )
};

export default ProductCreate;