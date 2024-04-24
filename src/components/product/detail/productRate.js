import {Button, Input, Popconfirm, Rate} from "antd";
import React, {useEffect, useState} from "react";
import AuthService from "../../../service/AuthService";
import message from "../../../service/MessageService"
import FetchData from "../../api/Fetch.api";
import {QuestionCircleOutlined, SendOutlined, UserOutlined} from '@ant-design/icons';

const ProductRate = ({productDetail, onMessage}) => {
    const [rate, setRate] = useState(productDetail?.userRate?.rate);
    const [product, setProduct] = useState(productDetail)
    const [newComment, setNewComment] = useState('')

    const handleRate = (value) => {
        setRate(value);
    }

    const handleRateConfirm = () => {
        console.log(rate);
        FetchData.rateAPI.update({
            rate: rate,
            productId: product.id,
        }).then((res) => {
            if (res.status === 200) {
                onMessage(message.contextType.success.rating);
                window.location.reload();
            }
        })
    }

    const addNewComment = () => {
        FetchData.feedbackAPI.addFeedback({
            content: newComment,
            productId: product.id,
        }).then((res) => {
            FetchData.productAPI.detail(product.id)
                .then((res) => {
                    setNewComment('');
                    setProduct(res)
                })
        })
    }

    return (
        <div style={{marginLeft: '50px', backgroundColor: '#b7b3b3', width: '900px'}}>
            <div style={{marginLeft: '5px'}}>
                <h3>Đánh giá sản phẩm</h3>
                <div>

                    <div style={{height: '50px', display: "flex"}}>
                        <div style={{marginRight: '5px'}}>
                            Đánh giá:
                        </div>
                        {AuthService.isLoggedIn() ? <Popconfirm
                            title="Xác nhận"
                            description={`Bạn có chắc chăn đánh giá ${rate} sao cho sản phẩm này?`}
                            icon={<QuestionCircleOutlined style={{color: 'blue'}}/>}
                            onConfirm={handleRateConfirm}
                        >
                            <Rate defaultValue={rate} onChange={(value) => handleRate(value)}/>
                        </Popconfirm>
                            : <Rate disabled defaultValue={rate}/>}

                    </div>
                </div>
                <div style={{display: "flex", width: '840px'}}>
                    <div style={{flex: 3}}>
                        <Input.TextArea rows={2} style={{marginBottom: '40px', width: '600px'}}
                                        value={newComment}
                                        disabled={!AuthService.isLoggedIn()}
                                        onChange={(event) => setNewComment(event.target.value)}
                                        autoSize={false}/>
                    </div>
                    <div style={{flex: 1}}>
                        <SendOutlined onClick={addNewComment} style={{fontSize: '40px'}}/>
                    </div>
                </div>
                <div style={{marginBottom: '50px', marginLeft: '10px', width: '800px'}}>
                    {product && product.productStatistic.feedback.map(feedback => {
                        return (
                            <div style={{marginBottom: '25px', backgroundColor: '#a8a8a8'}}>
                                <div style={{display: "flex"}}>
                                    <div style={{flex: 1, alignItems: "center", textAlign: "center", marginTop: '5px'}}>
                                        <a>
                                            {feedback.avatar ? <img
                                                src={feedback.avatar}
                                                style={{width: "50px", height: "50px"}}
                                            /> : <UserOutlined style={{fontSize: '50px'}}/>}
                                        </a>
                                    </div>
                                    <div style={{flex: 9}}>
                                        <div>
                                            <div style={{display: "flex"}}>
                                                <div style={{flex: 4}}>
                                                    {feedback.author}
                                                </div>
                                                <div style={{flex: 1, fontSize: '12px'}}>
                                                    {feedback.createdAt}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{width: '100px'}}>
                                                    <Rate disabled defaultValue={feedback.rate}
                                                          style={{fontSize: "10px"}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{backgroundColor: '#969696'}}>
                                    <div style={{marginLeft: '80px', marginTop: '20px'}}>
                                        {feedback.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductRate;