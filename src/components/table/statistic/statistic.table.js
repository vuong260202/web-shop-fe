import {Button, Form, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import tableColumn from "../../defined/tableColumn";
import FetchApi from "../../api/Fetch.api";
import {SearchOutlined} from "@ant-design/icons";

const StatisticTable = ({parentType}) => {
    const [data, setData] = useState([]);
    const [now, setNow] = useState(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })));
    const [year, setYear] = useState({
        value: now.getFullYear(),
        label: now.getFullYear().toString()
    })
    const [month, setMonth] = useState({
        value: now.getMonth() + 1,
        label: (now.getMonth() + 1).toString()
    });
    const [monthOptions, setMonthOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);

    useEffect(() => {
        console.log(parentType)
        console.log(now);
        if (year.label !== now.getFullYear().toString()) {
            let data = [{value: 0, label:'All'}];
            for (let i = 1; i <= 12; i++) {
                data.push({value: i, label: i.toString()});
            }
            setMonthOptions(data);
        } else {
            let data = [{value: 0, label:'All'}];
            for (let i = 1; i <= 12; i++) {
                data.push({value: i, label: i.toString()});
            }
            setMonthOptions(data);
        }

        {
            let data = [{value: 0, label:'All'}];
            for (let i = now.getFullYear(); i >= now.getFullYear() - 10; i--) {
                data.push({value: i, label: i.toString()});
            }
            setYearOptions(data);
        }


        handleSearch({
            month: month.value,
            year: year.value,
            parentType: parentType,
        });
    }, []);

    useEffect(() => {
        handleSearch({
            month: month.value,
            year: year.value,
            parentType: parentType,
        });
    }, [parentType]);

    const handleSearch = (condition) => {
        console.log(parentType);
        console.log("parentType", parentType)
        if (parentType === '1') {
            FetchApi.productAPI.filterStatistic(condition).then((res) => {
                console.log('success');
                console.log(res);
                if (res) {
                    res?.products.map((product, index) => {
                        console.log(product)
                        product.index = index + 1;
                        product.productName = <a href={`/${product.id}/detail`}>{product.productName}</a>;
                        product.totalRate = product.totalRate ?? 0
                    })
                    setData(res.products);
                }
            })
        } else {
            FetchApi.categoryAPI.filterStatistic(condition).then((res) => {
                console.log(res);
                if (res) {
                    res?.categories.map((category, index) => {
                        console.log(category)
                        category.index = index + 1;
                        category.productName = <a href={`/${category.id}/detail`}>{category.productName}</a>;
                        category.totalRate = category.totalRate ?? 0
                    })
                    setData(res.categories);
                }
            })
        }

    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{flexGrow: 5, display: "flex", alignItems: "center"}}>
                <div style={{marginRight: "15px", alignItems: "center"}}>
                    <Form.Item
                        label={"Tháng"}>
                        <Select defaultValue={month?.label}
                                value={month?.label}
                                onChange={((value, m) => setMonth(m))}
                                options={monthOptions}
                        />
                    </Form.Item>
                </div>
                <div style={{marginRight: "10px", alignItems: "center"}}>
                    <Form.Item
                        label={"Năm"}>
                        <Select defaultValue={year?.label}
                                onChange={(value, y) => {
                                    setYear(y);
                                    setMonth({
                                        value: 0,
                                        label: 'All'
                                    });
                                }}
                                options={yearOptions}
                        />
                    </Form.Item>
                </div>
                <div style={{marginRight: "10px", marginTop: '-22px'}}>
                    <Button icon={<SearchOutlined />} onClick={() => handleSearch({
                        month: month.value,
                        year: year.value,
                        parentType: parentType,
                    })}/>
                </div>
            </div>
            <div style={{flexGrow: 5}}>
                <Table
                    columns={parentType === '1' ? tableColumn.column.statistic.product : tableColumn.column.statistic.category}
                    dataSource={data}
                />
            </div>
        </div>

    )
}

export default StatisticTable;