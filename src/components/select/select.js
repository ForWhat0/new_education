import Select, { components } from "react-select";
export const SelectStyled =({value,onChange,options})=>{
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            color: state.selectProps.menuColor,
            padding: 5,
            zIndex:5
        }),

        control: (_, { selectProps: { width  }}) => ({
            width: width,
            marginTop: '5px',
            backgroundColor: 'transparent',
            border: '1px solid #1D1D1B',
            boxSizing: 'border-box',
            borderRadius: '9px',
            display:'flex',
            padding:' 5px 0 5px 5px',
            fontSize: '12px'
        }),
    }

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <i style={{color:'black'}}  className="fa fa-caret-down" />
            </components.DropdownIndicator>
        );
    };


    return(
            <Select
                placeholder=''
                value={value}
                onChange={onChange}
                styles={customStyles}
                components={{  DropdownIndicator }}
                width='100%'
                menuColor='black'
                options={options}
            />
    )
}