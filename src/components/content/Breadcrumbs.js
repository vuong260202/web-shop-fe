import { Breadcrumb } from "antd"
import { useNavigate } from "react-router-dom";

let data = {
    gender: "giới tính",
    category: "hãng",
    productName: "tên sản phẩm",
};

const GetValuesData = () => {
    let values = Object.values(data);
    return values;
}

const GetKeyData = () => {
    let values = Object.keys(data);
    return values;
}

const Breadcrumbs = () => {
    const navigate = useNavigate();

    return (
        <Breadcrumb>
            {GetValuesData().map((ar) => (
                <Breadcrumb.Item>
                <a>{ar}</a>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}

export default Breadcrumbs;