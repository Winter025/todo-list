import { useState } from "react";





const AddItem = () => {
    const [work, setWork] = useState<string>("");



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWork(event.target.value);
	}

    

    const addTodo = async () => {
		if (work == "") { return; }

		await fetch("api/items",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: work })
			}
		);
		setWork("");
	}


	const handleKeyDown = async (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.code !== 'Enter') { return; }
		addTodo();
	}



    return (
        <div className="container">
			<input className="item" type="text" value={work} onChange={handleChange} onKeyDown={handleKeyDown}/>
			<button className="item" onClick={addTodo}>+ 추가하기</button>
		</div>
    )
}

export default AddItem