import "./Styles/advent.css";
import ticketLogo from "../assets/ticket.svg";


async function getMovieData(genre, runtime, release, providers, num_res) {
    const body = {'with_genres': genre, 
        'with_runtime.lte': runtime,
        'primary_release_data': release,
        'with_watch_providers': providers,
        'num_results': num_res
        }
    const response = await fetch("/api/submit", {method: "POST", body: JSON.stringify(body)});

    const info = await response.json();
}

function Advent() {
<<<<<<< Updated upstream
=======
    const [movie_dict, setMovieDict] = useState(null)

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
        
    }, [comedyInfo, mysteryInfo, actionInfo, docuInfo, romInfo, netInfo, HBInfo, parInfo, pInfo, fubInfo])



    function displaycard(x){

        setDisplay(x)
        setView(true)

    }
>>>>>>> Stashed changes
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