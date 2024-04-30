import {Button, Form, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import tableColumn from "../../defined/tableColumn";
import FetchApi from "../../api/Fetch.api";
import {SearchOutlined} from "@ant-design/icons";
import {CSVLink} from "react-csv";

const StatisticTable = ({parentType}) => {
    const [data, setData] = useState([]);
    const [dataExport, setDataExport] = useState([]);
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
                    let dte = JSON.parse(JSON.stringify(res));
                    let dt = JSON.parse(JSON.stringify(res));

                    dte.products.map((product, index) => {
                        product.index = index + 1;
                        product.totalRate = product.totalRate ?? 0
                        return product
                    });

                    dt.products.map((product, index) => {
                        product.index = index + 1;
                        product.totalRate = product.totalRate ?? 0;
                        product.productName = <a href={`/${product.id}/detail`}>{product.productName}</a>;
                        return product
                    });
                    setDataExport(dte.products)
                    setData(dt.products);
                }
            })
        } else {
            FetchApi.categoryAPI.filterStatistic(condition).then((res) => {
                if (res) {
                    let dte = JSON.parse(JSON.stringify(res));
                    let dt = JSON.parse(JSON.stringify(res));

                    dte.categories.map((category, index) => {
                        console.log(category)
                        category.index = index + 1;
                        category.totalRate = category.totalRate ?? 0
                    })

                    dt.categories.map((category, index) => {
                        console.log(category)
                        category.index = index + 1;
                        category.productName = <a href={`/${category.id}/detail`}>{category.productName}</a>;
                        category.totalRate = category.totalRate ?? 0
                    })
                    setDataExport(dte.categories)
                    setData(dt.categories);
                }
            })
        }

    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{flexGrow: 5, display: "flex", alignItems: "center", width: '100%'}}>
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
                    <Button icon={<SearchOutlined/>} onClick={() => handleSearch({
                        month: month.value,
                        year: year.value,
                        parentType: parentType,
                    })}/>
                </div>
                <nav style={{flex: 1}}/>
                <div style={{marginRight: '5px', marginTop: '-22px'}}>
                    <CSVLink data={dataExport}
                             headers={parentType === '1'
                                 ? tableColumn.csv.header.product
                                 : tableColumn.csv.header.category}
                             separator={';'}
                             filename={`data-${parentType === '1' ? 'product':'category'}-${month.value === 0 ? 'all':month.label}-${year.value === 0 ? 'all':year.label}.csv`}
                    >
                        <Button type="primary">Xuất dữ liệu</Button>
                    </CSVLink>
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