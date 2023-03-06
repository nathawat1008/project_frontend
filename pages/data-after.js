import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const headers =  {'Content-Type': 'application/json'};

function data_after() {
    const [ data, setData ] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:8000/predict/data-after-perform-model", {
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(json => setData(json.data))
            // const json = await res.json();
            // console.log(json);
            // setData(json);
            console.log(data)
        }
        catch(err) {
            console.log(err);
            return err
        }
    }, []);
    useEffect(() => {
        console.log('data change', data, data[0] ? 'true' : 'false');
        // data.forEach((d) => {
        //     console.log(d);
        // })
    }, [data]);
    useEffect(() => {
        // const get_data = async () => {
        //     try {
        //         const res = await fetch("http://localhost:8000/predict/data-after-perform-model", {
        //             method: 'GET',
        //             // headers: headers
        //         });
        //         const json = await res.json();
        //         setData(json);
        //         console.log(json);
        //     }
        //     catch(err) {
        //         console.log(err);
        //         return err
        //     }
        // }
        // get_data().catch(console.error);
        fetchData()
        console.log('data', data);
    }, [fetchData])

    function DataList(props) {
        const data = props.data;
        console.log(data);
        const listItem = data.map((item) => 
            // console.log(item, typeof(item));
            <li key={item.toString()}>{item[0]} , {item[1]}</li>
        );
        return (
            <ul>
                {/* <li>comp1 , comp2</li> */}
                {listItem}
            </ul>
        )
    }
    const tmp = [1, 2];
    if (data[0]) {
        return (
            // <ul>
            //     {data.map((list) => {
            //         <li>{list}</li>
            //     })}
            // </ul>
            <div className='bg-fuchsia-50 p-2 h-full'>
                <div className='flex gap-4 mb-2'>
                    <div className='border hover:bg-gray-200'><Link href="/" >Back</Link></div>
                    <div>Data after embedded to low-dimensional space</div>
                </div>
                <DataList data={data}/>
            </div>
        )
    }
    else {
        return (
            <div>Loading...</div>
        )
    }
}

export default data_after;