import {Input, Modal} from "antd";
import FetchData from "../api/Fetch.api";
import React, {useEffect, useRef, useState} from "react";

const ProductCompare = ({setOpen}) => {
    const [productNames, setProductNames] = useState([]);
    const [suggestId, setSuggestId] = useState(0);
    const [openSuggest, setOpenSuggest] = useState(false);
    const listRef = useRef(null);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        const highlightedItem = listRef.current.children[suggestId];
        if (highlightedItem) {
            highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [suggestId]);

    const handleCompareProduct = () => {
        console.log("productCompare")
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
                onFocus={() => {setOpenSuggest(true);}}
                onBlur={() => {
                    setTimeout(() => setOpenSuggest(false), 200)}}
                value={productName}
                onChange={(text) => {
                    console.log(">>>");

                    if (!text.target.value && text.target.value?.length === 0) return;
                    setProductName(text.target.value);

                    FetchData.productAPI.getProductNames({
                        query: text.target.value
                    }).then(res => {
                        setProductNames(res);
                    })
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
                {openSuggest && productNames.length > 0 && productNames.map((productName, index) => {
                    return (
                        <div
                            style={{
                                marginBottom: "10px",
                                backgroundColor: index === suggestId ? "gray" : "transparent"}}
                            key={index}
                        >
                            {productName.productName}
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default ProductCompare;