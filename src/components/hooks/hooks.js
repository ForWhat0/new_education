import { useEffect } from 'react';

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
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.3)';
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