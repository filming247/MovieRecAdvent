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
            let genre = []
            if (comedyInfo) {
                genre.push("Comedy");
            }
            if (mysteryInfo) {
                genre.push("Mystery");
            }
            if (actionInfo) {
                genre.push("Action");
            }
            if (docuInfo) {
                genre.push("Documentary");
            }
            if (romInfo) {
                genre.push("Romance");
            }
            let platform = [];
            if (netInfo) {
                platform.push("Netflix");
            }
            if (HBInfo) {
                platform.push("HBO Max");
            }
            if (parInfo) {
                platform.push("Paramount+")
            }
            if (pInfo) {
                platform.push("Peacock");
            }
            if (fubInfo) {
                platform.push("FuboTV");
            }
            const data = await getMovieData(genre, 120, "2020-01-01", platform, 5)
            //console.log(data)
            setMovieDict(data)
        }

        x()
        
    }, [])

    const [comedyInfo, setComedyInfo] = useState(false)
    const [mysteryInfo, setMysteryInfo] = useState(false)
    const [actionInfo, setActionInfo] = useState(false)
    const [docuInfo, setDocuInfo] = useState(false)
    const [romInfo, setRomInfo] = useState(false)
    const [netInfo, setNetInfo] = useState(false)
    const [HBInfo, setHBInfo] = useState(false)
    const [parInfo, setParInfo] = useState(false)
    const [pInfo, setPInfo] = useState(false)
    const [fubInfo, setFubInfo] = useState(false)
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
                    <input type="checkbox" value={comedyInfo} onChange={(e)=>{setComedyInfo(e.target.checked)}} id="comedy-filter" />
                    Comedy
                </label>

                <label className="sidebar-option" htmlFor="mystery-filter">
                    <input type="checkbox" value={mysteryInfo} onChange={(e)=>{setMysteryInfo(e.target.checked)}} id="mystery-filter" />
                    Mystery
                </label>

                <label className="action-option" htmlFor="action-filter">
                    <input type="checkbox" value={actionInfo} onChange={(e)=>{setActionInfo(e.target.checked)}} id="action-filter" />
                    Action
                </label>

                <label className="docu-option" htmlFor="docu-filter">
                    <input type="checkbox" value={docuInfo} onChange={(e)=>{setDocuInfo(e.target.checked)}} id="docu-filter" />
                    Documentary
                </label>

                <label className="rom-option" htmlFor="rom-filter">
                    <input type="checkbox" value={romInfo} onChange={(e)=>{setRomInfo(e.target.checked)}} id="rom-filter" />
                    Romance
                </label>


                <label className="net-option" htmlFor="net-filter">
                    <input type="checkbox" value={netInfo} onChange={(e)=>{setNetInfo(e.target.checked)}} id="net-filter" />
                    Netflix
                </label>

                <label className="hb-option" htmlFor="hb-filter">
                    <input type="checkbox" value={HBInfo} onChange={(e)=>{setHBInfo(e.target.checked)}} id="hb-filter" />
                    HBO Max
                </label>

                <label className="par-option" htmlFor="par-filter">
                    <input type="checkbox" value={parInfo} onChange={(e)=>{setParInfo(e.target.checked)}} id="par-filter" />
                    Paramount Plus
                </label>

                <label className="p-option" htmlFor="p-filter">
                    <input type="checkbox" value={pInfo} onChange={(e)=>{setPInfo(e.target.checked)}} id="p-filter" />
                    Peacock
                </label>

                <label className="fub-option" htmlFor="fub-filter">
                    <input type="checkbox" value={fubInfo} onChange={(e)=>{setFubInfo(e.target.checked)}} id="fub-filter" />
                    FuboTV
                </label>

                {/* add more filters as needed */}
            </aside>
        </div>
    );
}

export default Advent;