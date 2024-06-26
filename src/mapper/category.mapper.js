import React from "react";
import {Switch} from "antd";


const CategoryMapper = {
    CategoryListToCategoryManager: ({categories, deleteClickEvent, changeStatusEvent}) => {
        return categories.map((category, index) => ({
                key: index + 1,
                id: category.id,
                categoryName: category.categoryName,
                productCount: category.productCount,
                path: category.path,
                updatedAt: category.updatedAt,
                image: (
                    <div>
                        <img
                            src={'http://localhost:3001' + category.path}
                            style={{width: '100px', height: "auto"}}
                        />
                    </div>),
                hide: (
                    <Switch
                        defaultChecked={category.status === 'active'}
                        style={{width: '30px'}}
                        value={category.status === 'active'}
                        onClick={() => changeStatusEvent({
                            categoryId: category.id,
                            status: category.status === 'active'
                        })}/>
                ),
                update: (<div>
                    <a href={`http://localhost:3001/admin/${category.id}/category-update`}>sửa</a> |
                    <a onClick={() => deleteClickEvent({categoryId: category.id,})}>xóa</a>
                </div>)
            })
        );
    },
    CategoryListToDataExport: (categories) => {
        return categories.map((category, index) => {
            console.log(category)
            category.index = index + 1;
            category.totalRate = category.totalRate ?? 0;

            return category;
        })
    },
    CategoryListToCategoryStatistic: (categories) => {
        return categories.map((category, index) => {
            console.log(category)
            category.index = index + 1;
            category.productName = <a href={`/${category.id}/detail`}>{category.productName}</a>;
            category.totalRate = category.totalRate ?? 0;

            return category;
        })
    }
}

export default CategoryMapper;