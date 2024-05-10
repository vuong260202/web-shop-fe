import React from "react";


const CategoryMapper = {
    CategoryListToCategoryManager: ({categories, deleteClickEvent}) => {
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
                update: (<div>
                    <a href={`http://localhost:3001/admin/${category.id}/category-update`}>sửa</a> |
                    <a onClick={() => deleteClickEvent({categoryId: category.id,})}>xóa</a>
                </div>)
            })
        );
    }
}

export default CategoryMapper;