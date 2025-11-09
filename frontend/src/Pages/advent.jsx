import "./Styles/advent.css";
import ticketLogo from "../assets/ticket.svg";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import React from 'react';

async function getMovieData(genre, runtime, release, providers, num_res) {
    const body = {'with_genres': genre, 
        'with_runtime.lte': runtime,
        'primary_release_data': release,
        'with_watch_providers': providers,
        'num_results': num_res
        }

    console.log(body)
    const response = await fetch("/api/submit", {method: "POST", body: JSON.stringify(body)});

    const info = await response.json();
    console.log(info)
    return info
}

function Advent() {
    const [movie_dict, setMovieDict] = useState(null)
    useEffect(()=> {
        
        const x = async () => {
            const data = await getMovieData(["Mystery"], 120, "2020-01-01", ["Netflix"], 5)
            //console.log(data)
            setMovieDict(data)
        }

        x()
        
    }, [])
function handleDisplay(x){

   

}
    const [display, setDisplay] = useState(0)
    const [view, setView] = useState(false)


    function displaycard(x){

        setDisplay(x)
        setView(true)

    }
    return (
        <div className="background">
            <div className="allTix">
                <div className={  view ? "ticket-display" : "ticket-none"}>
                    {movie_dict != null ? <MovieCard movie_info={movie_dict[display]}></MovieCard> : null}
                </div>
                <div className="image1-box" >
                    <img src={ticketLogo} className="ticket-box" alt="Ticket logo" onClick={()=>displaycard(0)} />
                    <img src={ticketLogo} className="ticket-box" alt="Ticket logo"  onClick={()=>displaycard(1)}/>
                </div>
                <div className="showing-box"> 
                    <div className="show">
                        NOW SHOWING!
                    </div>
                </div>
                <div className="image1-box">
                    <img src={ticketLogo} className="ticket-box" alt="Ticket logo"  onClick={()=>displaycard(2)} />
                    <img src={ticketLogo} className="ticket-box" alt="Ticket logo"  onClick={()=>displaycard(3)} />
                </div>
            </div>

            <aside className="sidebar">
                <h3 className="sidebar-title">Filters</h3>

                <label className="sidebar-option" htmlFor="comedy-filter">
                    <input type="checkbox" id="comedy-filter" />
                    Comedy
                </label>

                <label className="sidebar-option" htmlFor="mystery-filter">
                    <input type="checkbox" id="mystery-filter" />
                    Mystery
                </label>

                <label className="action-option" htmlFor="action-filter">
                    <input type="checkbox" id="action-filter" />
                    Action
                </label>

                <label className="docu-option" htmlFor="docu-filter">
                    <input type="checkbox" id="docu-filter" />
                    Documentary
                </label>

                <label className="rom-option" htmlFor="rom-filter">
                    <input type="checkbox" id="rom-filter" />
                    Romance
                </label>


                <label className="net-option" htmlFor="net-filter">
                    <input type="checkbox" id="net-filter" />
                    Netflix
                </label>

                <label className="hb-option" htmlFor="hb-filter">
                    <input type="checkbox" id="hb-filter" />
                    HBO Max
                </label>

                <label className="par-option" htmlFor="par-filter">
                    <input type="checkbox" id="par-filter" />
                    Paramount Plus
                </label>

                <label className="p-option" htmlFor="p-filter">
                    <input type="checkbox" id="p-filter" />
                    Peacock
                </label>

                <label className="fub-option" htmlFor="fub-filter">
                    <input type="checkbox" id="fub-filter" />
                    FuboTV
                </label>

                {/* add more filters as needed */}
            </aside>
        </div>
    );
}

export default Advent;