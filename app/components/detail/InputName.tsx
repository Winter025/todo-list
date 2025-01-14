import { useContext } from "react";
import { NameContext } from './ItemContext'



const InputName = () => {   
    const object = useContext(NameContext)

    if (object == null) { return }

    console.log(object.name)
    console.log(object.changeName)


    return (
        <div>
            <input defaultValue={object.name} className="inputName" onChange={object.changeName}/>
        </div>
    );
}

export default InputName