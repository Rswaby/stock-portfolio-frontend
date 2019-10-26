import React from 'react';
import { Link } from 'react-router-dom';
const style = {
    link: {
        "textDecoration": "none",
        "color": "black",
        "textAlign": "center",
    }
}
const StockCard = ({ data }) => (
    <div className={"card"}>
        <Link
            style={style.link}
            onClick={() => {
                localStorage.setItem(data["1. symbol"], data["2. name"])
            }}
            to={`/stock/${data["1. symbol"]}`}>
            <div className={"content"}>
                <h6> {data["1. symbol"]}</h6>
                <p>{data["2. name"]}</p>
                <p>Market Open | {data["5. marketOpen"]} </p>
                <p>Market Close | {data["6. marketClose"]}</p>
                <p>Currency | {data["8. currency"]} </p>
            </div>
        </Link>
    </div>
)

export default StockCard;