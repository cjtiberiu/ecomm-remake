import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

const ImageUpload = props => {

    const user = useSelector(state => state.user);

    const { values, setValues, setLoading, loading } = props;

    const fileUploadAndResize = (e) => {
        // resize
        let files = e.target.files;
        let uploadedImages = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i], 
                    720, // width
                    720, // height
                    'jpeg', // format
                    100, // quality
                    0, // rotation
                    (uri) => { // callback

                        // post images to the backend endpoint
                        axios.post(
                            `${process.env.REACT_APP_API}/uploadimages`, 
                            { image: uri }, 
                            {
                                headers: {
                                    authToken: user ? user.token : '',
                                }
                            }
                        )
                        .then(res => {
                            setLoading(false);
                            uploadedImages.push(res.data);

                            setValues({ ...values, images: uploadedImages})
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log('Error', err)
                        })
                    }, 'base64');
            }
        }
        
    }

    const handleImageRemove = public_id => {
        setLoading(true);

        let uploadedImages = values.images;

        axios.post(
            `${process.env.REACT_APP_API}/removeimage`,
            { public_id },
            {
                headers: {
                    authToken: user ? user.token : ''
                }
            }
        )
        .then(res => {
            setLoading(false);
            setValues({ ...values, images: uploadedImages.filter(image => image.public_id !== public_id)});
        })
        .catch(err => {
            setLoading(false);
            toast.error('Error deleting image');
        });
    }


    const displayImages = () => {
        return values.images.map(image => {
            // return <img src={`${image.url}`} style={{ width: 200, height: 'auto', marginRight: '5px' }} />
            return (
                <div key={image.public_id}>
                    <Badge count='X' className='mr-3' key={image.public_id} onClick={() => handleImageRemove(image.public_id)} style={{ cursor: 'pointer'}}>
                        <Avatar key={image.public_id} src={`${image.url}`} size={100} shape='square' />
                    </Badge>
                </div>
            )
        })
    }

    
    return (
        <div>
            <input type='file' multiple accept='images/*' onChange={fileUploadAndResize} />

            { 
                loading ? <div className='d-flex align-items-center justify-content-center' style={{width: '20%', height: '100px' }}><SyncOutlined spin style={{fontSize: '20px'}}/></div> : (
                    <div className='d-flex mt-3'>
                        
                        {displayImages()}
                        
                    </div>
                )
            }

            
        </div>
    )
};

export default ImageUpload;