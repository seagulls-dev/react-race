import React, {useEffect, useState} from "react";
import axios from "axios";

const Race = props => {

    const [raceIds, setRaceIds] = useState([]);
    const [races, setRaces] = useState({});
    const category = [
        {
            name : "Greyhound racing",
            key : "9daef0d7-bf3c-4f50-921d-8e818c60fe61"
        },
        {
            name : "Harness racing",
            key : "161d9be2-e909-4326-8c2c-35ed71fb460b"
        },
        {
            name : "Horse racing",
            key : "4a2788f8-e825-4d36-9894-efd4baf1cfae"
        }
    ];
    const [filter, setFilter] = useState("9daef0d7-bf3c-4f50-921d-8e818c60fe61")

    useEffect(()=>{
        axios.get(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10`)
            .then(res => {
                console.log(res.data)
                setRaceIds(res.data.data.next_to_go_ids);
                setRaces(res.data.data.race_summaries);

            })
    },[]);

    const handleChange = (e) => {
        const value = e.target.value;
        setFilter(value)
        console.log(value)
    }

    return (
        <React.Fragment>
            {
                raceIds && raceIds.slice(0,5).map((item,idx)=>{

                    let race = races[item];
                    return (
                        <div key={idx}>
                            <div>
                                <span>Meeting name  </span>
                                {race && race["meeting_name"]}
                            </div>
                            <div>
                                <span>Race number  </span>
                                {race && race["race_number"]}
                            </div>
                            <div>
                                <span>Timer  </span>
                                {race && race["advertised_start"]["seconds"]}
                            </div>
                            <hr/>
                        </div>
                    )
                })
            }
            <br/>
            <select onChange={handleChange}>
                {
                    category.map((item,idx)=>(
                        <option key={idx} value={item.key}>{item.name}</option>
                    ))
                }
            </select>
            {
                raceIds && raceIds.map((item,idx)=>{

                    let race = races[item];
                    return (
                        <div key={idx}>
                            {
                                race && race["category_id"]==filter &&
                                    <React.Fragment>
                                        <div>
                                            <span>Meeting name  </span>
                                            {race["meeting_name"]}
                                        </div>
                                        <div>
                                            <span>Race number  </span>
                                            {race["race_number"]}
                                        </div>
                                        <div>
                                            <span>Timer  </span>
                                            {race["advertised_start"]["seconds"]}
                                        </div>
                                        <hr/>
                                    </React.Fragment>
                            }

                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Race;
