import "./Styles/advent.css";
import ticketLogo from "../assets/ticket.svg";
import { useEffect, useState } from "react";

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
    return (
        <div className="background">
            <div className="image1-box">
                <img src={ticketLogo} className="ticket-box" alt="Ticket logo" />
                <img src={ticketLogo} className="ticket-box" alt="Ticket logo" />
            </div>
            <div className="showing-box"> 
                <div className="show">
                    NOW SHOWING!
                </div>
            </div>
            <div className="image1-box">
                <img src={ticketLogo} className="ticket-box" alt="Ticket logo" />
                <img src={ticketLogo} className="ticket-box" alt="Ticket logo" />
            </div>
        </div>
    )
}

export default Advent;