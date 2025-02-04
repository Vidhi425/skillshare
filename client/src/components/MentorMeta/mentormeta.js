"use client";

const mentormeta = ({username})=>{
    return(
        <div className="flex-col space-y-1">
            <div className="text-black  font-medium text-lg">{username}</div>
             <div className="text-gray-200 font-thin text-sm" >
                SDE-1
             </div>
        </div>
    )
}

export default mentormeta;