import React, { useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import FetchDatas from '../../FetchDatas';
import "../../css/Header/quickSearch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const QuickSearch = ({ type }) => {
    const [value, setValue] = useState({
        text1: "",
        text2: ""
    });

    const [findValue, setFindValue] = useState({
        val1: "",
        val2: ""
    });

    const [search, setSearch] = useState(false);

    const handleChange = (e) => {
        const targetname = [e.target.name];
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
        if ([e.target.name] == targetname && e.target.value.length >= 3) {
            FetchDatas.GetAll('api/Flights/Name/' + e.target.value, setFindValue);//if doesnt work implement in fetchDatas
        }
    }


    const RenderType = () => {
        const SearchLayout = (<div className="quickSearchPosition">
            <div className="quickReservations">
                <h6 className="text-white text-center text-uppercase">SZYBKIE WYSZUKIWANIE</h6>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="leavings">
                        <input type="text" className="quickSearchText form-control inputWidth" value={value.text1} name="text1" onChange={handleChange} placeholder="Wylot z:" />
                    </label>
                    <label htmlFor="destiantion">
                        <input type="text" className="quickSearchText form-control inputWidth" value={value.text2} name="text2" onChange={handleChange} placeholder="Wylot do:" />
                    </label>
                    <input className="btn btn-primary inputWidth" disabled type="submit" value="Przejdź!" />
                </form>
            </div>
        </div>);

        switch (type) {
            case "mobile":
                return (<>
                    <FontAwesomeIcon icon="magnifying-glass" className = "searchIconPos" onClick={() => setSearch(!search)} />
                    {search ? SearchLayout : ""}
                </>)
            case "standard":
                return (<>{SearchLayout}</>);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //redirect to concrete summary url with parameters
        //build summary component
    }

    return <>{RenderType()}</>
}

export default QuickSearch;