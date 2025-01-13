import "./FlexTypeV.css"
import {useEffect, useState} from "react";
import SortLayout from "./SortLayout.tsx";


function FlexTypeV() {

    const world = ['Hello','to','the','World']
    const types = ['block','flex']
    const [type, setType] = useState('block')
    const [layout, setLayout] = useState('block')

    useEffect(() => {

    },[])

    return (
        <>
          <div className="fv-container">
              <div className="fv-box" data-layout={layout}
              >
                  {world.map((item,i)=> (
                      <div className="fv-list box" key={i}>
                        <span>{item}</span>
                      </div>
                  ))}
              </div>
              <div className="fv-display">
                  <div>display:</div>
                  {
                      types.map((item,i)=> (
                          <div className="fv-btn" key={i}>
                              <button onClick={()=>{setType(item);setLayout(item)}}>{item}</button>
                              <div className="fv-bottom-line" style={{height: type === item ? 2 : 1}}></div>
                          </div>
                      ))
                  }
              </div>
          </div>
            <SortLayout/>
        </>
    )
}

export default FlexTypeV


