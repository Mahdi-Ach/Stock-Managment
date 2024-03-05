'use client'
const Errors = ({
    error,
    reset
  }:{
    error:Error;
    reset :()=>void
  })=>{
    return (
      <div>fdsdfs
        <h2>Something went wrong!</h2>
        <input type="text" />
        <button onClick={() => reset()}>Try again</button>
      </div>
    )
  }   
  export default Errors