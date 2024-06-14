import React from "react";
import Nav from "../SchedulerComponents/Nav"
import Scroll from "../SchedulerComponents/Scroll"
import Calender from "../SchedulerComponents/Calender"

function SchedulerHome() {
    return (
        <div>
            <Nav />
            <Scroll style={{ display: "inline" }} />
            <Calender style={{display:"inline"}} />
        </div>
    )
};

export default SchedulerHome;