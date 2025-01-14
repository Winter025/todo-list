import { useContext } from "react";
import { MemoContext } from './ItemContext'
import TextareaAutosize from 'react-textarea-autosize';



const InputMemo = () => {   
    const object = useContext(MemoContext)

    if (object == null) { return }

    console.log(object.memo)
    console.log(object.changeMemo)


    return (
        <div>
            <TextareaAutosize defaultValue={object.memo} className="inputMemo" onChange={object.changeMemo}/>
        </div>
    );
}

export default InputMemo