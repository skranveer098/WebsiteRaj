import React, {useContext} from "react";
import Nav from "../SchedulerComponents/Nav"
import Scroll from "../SchedulerComponents/Scroll"
import Calender from "../SchedulerComponents/Calender"
import { DateContext } from '../SchedulerComponents/DateContext';

function SchedulerHome() {
    const { clickedDate } = useContext(DateContext);
    
    return (
        <div>
            <Nav />
            <Scroll style={{ display: "inline" }} />
            <Calender style={{display:"inline"}} />
        </div>
    )
};

export default SchedulerHome;