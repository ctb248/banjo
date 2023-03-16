import { FC } from "react";
import './Priority.scss';
import { PriorityLevel } from "../../pages/Orders/useOrders";

interface PriorityProps {
    level: PriorityLevel;
}

const Priority: FC<PriorityProps> = ({ level }) => {

    return (
        <div className="priority-wrapper">
            <div className={`priority-badge ${level.toLowerCase()}`}></div>
            <span>{level}</span>
        </div>
    )
}

export default Priority;