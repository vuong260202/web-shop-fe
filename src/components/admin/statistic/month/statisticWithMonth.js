import React, {useEffect} from "react";
import {Table} from "antd";
import StatisticTable from "../../../table/statistic/statistic.table";

const StatisticWithMonth = ({parentType, dataType}) => {

    useEffect(() => {
        console.log(parentType)
    }, []);

    return (
        <div>
            <StatisticTable parentType={parentType}/>
        </div>
    );
};

export default StatisticWithMonth;
