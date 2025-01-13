

function SortLayout(){

    return (
        <>
            <div className='sl-container'>
                {
                    [1,2,3,4,5].map( element => (
                        <div key={element} className=''>{element}</div>
                    ))
                }
            </div>
        </>
    )
}

export default SortLayout
