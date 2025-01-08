function Select({ options, value }) {
    return (
        <Select>
            {options.map((el) => <option key={el} value={value}>{el}</option>)}
        </Select>
    )
}

export default Select;