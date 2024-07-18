import React, {useState, useEffect} from 'react'

const DummyPage = () => {
    const [open,setOpen] = useState(false)

    useEffect(()=>{console.log(open)},[open])
  return (
    <>
        <div style={{color:'white'}}>DummyPage</div>
        <button onClick={() => setOpen(!open)}>click me</button>
        {open && <div class="infopopup_main">
            i am the modal
            </div>}
    </>
  )
}

export default DummyPage