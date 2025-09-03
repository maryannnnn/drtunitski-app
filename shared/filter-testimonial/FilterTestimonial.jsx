import './filter-testimonial.scss'
import Input from "../input/Input";
import Select from "../select/Select";
//import 'rc-slider/assets/index.css';
import {buttonOptions} from "../button-options/button-options";
import ButtonBreak from "../button-break/ButtonBreak";

const FilterTestimonial = ({filter, setFilter}) => {

    const changeTitleHandler = (e) => {
        setFilter({...filter, title: e.target.value});
    }

    const changeCategoryHandler = (e) => {
        setFilter({...filter, categoryId: e.target.value});
    }

    const changeItemsHandler = (e) => {
        setFilter({...filter, itemsPerPage: e.target.value});
    }

    const changeCancelHandler = () => {
        setFilter({...filter, title: '', categoryId: 'All'});
    }

    const selectOptionsItems = [
        {value: 5, label: "5"},
        {value: 10, label: "10"},
        {value: 20, label: "20"},
        {value: 50, label: "50"},
        {value: 100, label: "100"},
    ];

    const selectOptionsCategory = [
        {value: "All", label: "All"},
        {value: "Массаж", label: "Массаж"},
         {value: "Курсы", label: "Курсы"}];

    return (
        <form className="filter">
            <div className="filter__block">
                {/*<label className="filter__title">Title</label>*/}
                <Input type="text" name="title" value={filter.title} onChange={changeTitleHandler} placeholder="Искать в заголовке..."/>
            </div>
            <div className="filter__block">
                {/*<label className="filter__title">Category</label>*/}
                <Select
                    name="category"
                    value={filter.categoryId}
                    onChange={changeCategoryHandler}
                    options={selectOptionsCategory}
                />
            </div>
            <div className="filter__block">
                {/*<label className="filter__title">Items</label>*/}
                <Select
                    name="items"
                    value={filter.itemsPerPage}
                    onChange={changeItemsHandler}
                    options={selectOptionsItems}
                />
            </div>
            <ButtonBreak type="submit"  name={buttonOptions.break} onClick={changeCancelHandler}  />
        </form>
    )
}

export default FilterTestimonial