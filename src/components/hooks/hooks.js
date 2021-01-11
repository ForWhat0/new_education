import {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {ClickVisuallyImpairedModeOff} from "../../redux/actions/actions";
import axios from "axios";
import {format} from "date-fns";

export const useOnClickOutside = (ref, handler) => {

    useEffect(() => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
            };
        },
        [ref, handler],
    );
};

export const ParcMenu = (
    data,
    {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
        const newItem = {...item};
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
        childrenOf[id] = childrenOf[id] || [];
        newItem[childrenKey] = childrenOf[id];
        parentId
            ? (
                childrenOf[parentId] = childrenOf[parentId] || []
            ).push(newItem)
            : tree.push(newItem);
    });
    return tree;
};
export const formatBytes=(bytes, decimals = 2) =>{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'Kb', 'Mb'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export const getDateIn_DD_MM_YYYY_Format =(date)=>{
    const newDate = new Date(date)
    const dd = String(newDate.getDate()). padStart(2, '0');
    const mm = String(newDate.getMonth() + 1). padStart(2, '0');
    const yyyy = newDate.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}
export const startEndPagination =(currentPage,totalPages)=>{
    let startPage, endPage
    if (totalPages <= 7) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 7;
        } else if (currentPage + 3 >= totalPages) {
            startPage = totalPages - 6;
            endPage = totalPages;
        } else {
            startPage = currentPage - 3;
            endPage = currentPage + 3;
        }
    }
    return {startPage,endPage}
}
export const  hexToRgbA=(hex)=>{
    let c
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length=== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.05)';
    }
    throw new Error('Bad Hex');
}
export const  formatDate=(date) =>{
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
export const  minDay=(date, days) =>{
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}
export const  maxDay=(date, days) =>{
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export const cutUri=(uri)=>{
    if (uri){
        if (
            uri.substring(0,4) === '/en/' ||
            uri.substring(0,4) === '/ru/'
        ){
            return uri.substring(3)
        }
        else {
            return  uri
        }
    }
}
export const ParcUri=(uri)=>{
    if (  cutUri(uri) === '/financial-statements/' ||
        cutUri(uri) === '/finansovaya-otchetnost-2/' ||
        cutUri(uri) === '/finansovaya-otchetnost/'){
        return  '/financialStatements'
    }
    else if(cutUri(uri) === '/kontakty/' ||
        cutUri(uri) === '/contacts/' ||
        cutUri(uri) === '/kontakti/'){
        return '/contacts'
    }
    else {
        return  cutUri(uri)
    }
}
 const  useWindowSize=()=>{
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export const  WindowDimensionsOffVisuallyImpaired=() =>{
    const dispatch = useDispatch()
    const [width] = useWindowSize()
    useEffect(()=>
        width !== 0 && width < 1024 && dispatch(ClickVisuallyImpairedModeOff())
        ,[width])
}

export const registerOnEventHook = async (eventName,time, fName, lName) => {
    const eventTime = `${format(time, "HH")}:${format(time, "mm")}`
    const eventDate = format(
        time,
        'dd/MM/yyyy'
    )
    const data = {
        eventName,
        eventDate,
        eventTime,
        fName,
        lName
    }

    try {
        const res = await axios({
            method: "post",
            url: "/api/mail",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            },
            data
        })
        return res

    } catch (error) {
        return error
    }
}
export const sendAppeal = async ( fName, lName,reason,phone) => {
    const data = {
        fName,
        lName,
        reason,
        phone
    }

    try {
        const res = await axios({
            method: "post",
            url: "/api/appeal",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            },
            data
        })
        return res

    } catch (error) {
        return error
    }
}
export const sendComment = async ( name,phone,email,comment ) => {
    const data = {
        name,
        phone,
        email,
        comment
    }

    try {
        const res = await axios({
            method: "post",
            url: "/api/leftComment",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            },
            data
        })
        return res

    } catch (error) {
        return error
    }
}
export const registerZnoHook = async ( name,phone,email,comment,learn ) => {
    const data = {
        name,
        phone,
        email,
        comment,
        learn
    }

    try {
        const res = await axios({
            method: "post",
            url: "/api/registerZno",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
            },
            data
        })
        return res

    } catch (error) {
        return error
    }
}

