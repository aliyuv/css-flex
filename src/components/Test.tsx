import {createFlip} from "../hooks/useFlip.tsx";
import {useEffect} from "react";
import './Test.css'
function Test() {

    useEffect(() => {
        const box = createFlip('.box');
        box.flip({ delay: 600 });
    }, []);

    return (
        <>
                <div className="flex start">
                    <div className="box small"></div>
                </div>
                <div className="flex end">
                    <div className="box large"></div>
                </div>

            <button onClick={() => {

            }}>111111111111111</button>
        </>
    );
}

export default Test;
