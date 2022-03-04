import React, { useState } from 'react';
import { MdDragHandle } from 'react-icons/md';
import "../css/Header/quickSearch.css";
const QuickSearch = () => {
    const [value, setValue] = useState({
        text1: "",
        text2: ""
    });

    const handleChange = (e) => {
        const changedValue = [e.target.name];
        setValue({//nie pamiętam czy to jest dobrze do zmian stanu
            ...value,
            changedValue: e.target.value
        })
        if (changedValue.value >= 3) {
            //search by name
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //przejść do zakładki o wylocie
    }

    return (
        <div className="">
            <div className="quickReservations">
                <h6 className="text-white text-center text-uppercase">Szybie wyszukiwanie</h6>
                {Flights.length > 0 &&
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="leavings">
                        <input type="text" value={value.text1} name="text1" onChange={handleChange} placeholder="Wylot z:" />
                        </label>
                    <label htmlFor="destiantion">
                        <input type="text" value={value.text2} name="text2" onChange={handleChange} placeholder="Wylot do:" />
                    </label>
                    <input className="btn btn-primary" disabled type="submit" value="Przejdź!" />
                    </form>}
            </div>
        </div>
    )
}

export default QuickSearch;