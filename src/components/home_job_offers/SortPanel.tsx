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
            className="appearance-none text-sm font-medium outline-none py-3 px-3 rounded bg-main-lighter-2"
            onChange={handleSortChange}
        >
            <option value="reward,asc">Reward Ascending</option>
            <option value="reward,desc">Reward Descending</option>
            <option value="opensIn,asc">Opens Ascending</option>
            <option value="opensIn,desc">Opens Descending</option>
        </select>
    );
};

export default SortPanel;