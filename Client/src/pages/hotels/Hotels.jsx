import "./hotels.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useState } from "react";
import {format} from "date-fns"
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

function Hotels() {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate,setOpenDate] = useState(false);
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);

  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min ||0}&max=${max||999}`);

  const handleClick = ()=>{
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type ="hotels"/>
      <div className="hotelsContainer">
        <div className="hotelsWrapper">
          <div className="hotelsSearch">
            <h1 className="hotelsTitle">Search</h1>
            <div className="hotelsItem">
              <label htmlFor="">Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="hotelsItem">
              <label>Check-in Date </label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to 
              ${format(dates[0].endDate,"dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                onChange={item=>setDates([item.selection])}
                minDate = {new Date()}
                ranges = {dates}
                />)}
            </div>
            <div className="hotelsItem">
              <label >Options</label>
              <div className="hotelsOptions">
                <div className="hotelsOptionItem">
                  <span className="hotelsOptionText">Min Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="hotelsOptionInput" />
                </div>
                <div className="hotelsOptionItem">
                  <span className="hotelsOptionText">Max Price <small>per night</small></span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className="hotelsOptionInput" />
                </div>
                <div className="hotelsOptionItem">
                  <span className="hotelsOptionText">Adult</span>
                  <input type="number" min={1} className="hotelsOptionInput" placeholder={options.adult} />
                </div>
                <div className="hotelsOptionItem">
                  <span className="hotelsOptionText">Children</span>
                  <input type="number" min={0} className="hotelsOptionInput" placeholder={options.children}/>
                </div>
                <div className="hotelsOptionItem">
                  <span className="hotelsOptionText">Rooms</span>
                  <input type="number" min={1} className="hotelsOptionInput" placeholder={options.room}/>
                </div>
              </div>
              
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="hotelsResult">
            {loading ? "loading": <>
            {data.map(item =>(
              <SearchItem item={item} key={(item._id)}/>

            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels 