const details = (product) => {
    console.log(product);
    return [
        {
            name: 'Home',
            api: '/'
        },
        {
            name: product.gender,
            api: '/gender'
        },
        {
            name: product.category,
            api: '/gender/category'
        },
        {
            name: product.productName,
            api: `/${product.id}/detail`
        }
    ]
}

const home = [
    {
        name: 'Home',
        api: '/'
    }
]

export default {
    details,
    home,
}