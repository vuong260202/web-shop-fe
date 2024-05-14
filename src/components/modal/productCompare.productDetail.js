import {Divider, Image, Input, Modal} from "antd";
import FetchData from "../api/Fetch.api";
import React, {useEffect, useRef, useState} from "react";

const HandleCompare = ({productId, compareProductId}) => {
    const [product, setProduct] = useState(null);
    const [compareProduct, setCompareProduct] = useState(null);

    useEffect(() => {
        FetchData.productAPI.detail(productId).then(res => {
            setProduct(res);
        })

        FetchData.productAPI.detail(compareProductId).then(res => {
            setCompareProduct(res);
        })
    }, [compareProductId])

    return (
        product && compareProduct && <div style={{
            display: "flex"
        }}>
            <div style={{
                flex: 1,
                borderRight: "1px solid #ccc"
            }}>
                <h3 style={{textAlign: "center"}}>
                    {product?.productName}
                </h3>
                <Divider />

                <div style={{
                    alignItems: "center",
                    textAlign: "center"
                }}>
                    {product && <Image
                        width={'200px'}
                        height={'200px'}
                        src={`http://localhost:3001` + product.path}/>}
                </div>
                <Divider />
            </div>
            <div style={{flex: 1}}>

                <h3 style={{textAlign: "center"}}>
                    {compareProduct?.productName}
                </h3>

                <Divider/>

                <div style={{
                    alignItems: "center",
                    textAlign: "center"
                }}>
                    {compareProduct && <Image
                        width={'200px'}
                        height={'200px'}
                        src={`http://localhost:3001` + compareProduct.path}/>}
                </div>

                <Divider/>
            </div>
        </div>
    )
}

const ProductCompare = ({setOpen, productId}) => {
    const [productNames, setProductNames] = useState([]);
    const [suggestId, setSuggestId] = useState(0);
    const [openCompare, setOpenCompare] = useState(false);
    const listRef = useRef(null);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        const highlightedItem = listRef.current.children[suggestId];
        if (highlightedItem) {
            highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [suggestId]);

    const handleCompareProduct = () => {
        console.log("productCompare", productNames[suggestId]);
        setOpenCompare(true);
    }

    return (
        <Modal
            centered
            open={true}
            onOk={() => {
                handleCompareProduct();
            }}
            onCancel={() => {
                setOpen(false);
            }}
            width={600}>
            <div style={{textAlign: "center", marginBottom: "15px"}}>
                Nhập tên sản phẩm so sánh
            </div>
            <Input
                value={productName}
                onChange={(text) => {
                    setProductName(text.target.value ?? '');

                    if (text.target.value && text.target.value?.length > 0) {
                        FetchData.productAPI.getProductNames({
                            query: text.target.value
                        }).then(res => {
                            setProductNames(res);
                        })
                    } else {
                        setProductNames([]);
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' && suggestId < productNames.length - 1) {
                        // event.preventDefault(); // Prevent page scrolling
                        setSuggestId(prevId => prevId + 1);
                        setProductName(productNames[suggestId + 1].productName);
                    } else if (event.key === 'ArrowUp' && suggestId > 0) {
                        setSuggestId(nextId => nextId - 1);
                        setProductName(productNames[suggestId - 1].productName);
                    } else if (event.key === 'Enter') {
                        handleCompareProduct();
                    }
                }}
            />
            <div style={{maxHeight: '100px', overflowY: "scroll", margin: "5px"}}  ref={listRef}>
                {!openCompare && productNames.length > 0 && productNames.map((productName, index) => {
                    return (
                        <div
                            style={{
                                marginBottom: "10px",
                                backgroundColor: index === suggestId ? "gray" : "transparent"}}
                            key={index}
                            onClick={() => {
                                setSuggestId(index);
                                setProductName(productName.productName);
                            }}
                        >
                            {productName.productName}
                        </div>
                    )
                })}

            </div>
            <div>
                {openCompare && <HandleCompare productId={productId} compareProductId={productNames[suggestId].id}/>}
            </div>
        </Modal>
    )
}

export default ProductCompare;