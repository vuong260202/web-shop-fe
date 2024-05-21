import FetchApi from "../../components/api/Fetch.api";

const handleButtonBack = ({setOpen, setName, setListNames}) => {
    setOpen(false);
    setName('');
    setListNames([])
}

const handleInputChange = ({text, setText, setSuggestNames}) => {
    setText(text);
    if (text && text.length > 0) {
        FetchApi.productAPI
            .getProductNames({query: text})
            .then(res => {
                setSuggestNames(res);
            });
    } else {
        setSuggestNames([]);
    }
}

const ProductDetailService = {
    productCompare: {
        button: {
            handleButtonBack,
        },
        input: {
            handleInputChange
        }
    }
}

export default ProductDetailService;