import { useState } from "react";





const AddItem = () => {
    const [work, setWork] = useState<string>("");



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWork(event.target.value);
	}

    

    const addBtn = async () => {
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



    return (
        <div className="container">
			<input className="item" type="text" value={work} onChange={handleChange} />
			<button className="item" onClick={addBtn}>+ 추가하기</button>
		</div>
    )
}

export default AddItem