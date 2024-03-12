const SortPanel = ({ sortValue, onSortChange }) => {

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        onSortChange(selectedValue);
    };

    return (
        <select
            id="sort-by"
            name="sort-by"
            defaultValue={sortValue}
            className="text-center appearance-none text-sm font-medium outline-none py-3 px-5 rounded bg-main-lighter-2 mt-4"
            onChange={handleSortChange}
        >
            <option value="reward,asc">Reward Ascending</option>
            <option value="reward,desc">Reward Descending</option>
            <option value="expiryDate,asc">Opens Ascending</option>
            <option value="expiryDate,desc">Opens Descending</option>
        </select>
    );
};

export default SortPanel;