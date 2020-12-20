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