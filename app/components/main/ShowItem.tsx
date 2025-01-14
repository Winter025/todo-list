import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';




interface todoItem {
    id: number;
    name: string;
    memo: string;
    isComplete: number;
};


const ShowItem = () => {

    const router = useRouter();
    const [list, setList] = useState<todoItem[]>([]);
    const [done, setDone] = useState<todoItem[]>([]);

    
    

    const GET_Items = async () => {
        const response = await fetch("api/items");
        const responseData = await response.json();
        const inputData = responseData.data.map((data: todoItem) => ({
            id: data.id,
            name: data.name,
            memo: data.memo,
            isComplete: data.isComplete
        }))
        for(let i = 0; i < inputData.length; i++) {
            if (inputData[i].isComplete == 0) {
                setList(prevList => [...prevList, inputData[i]]);
            } else {
                setDone(prevList => [...prevList, inputData[i]]);
            }
        }
    } 
        
    
    useEffect(() => {
        GET_Items();
    }, []);


    const handleDetail = (id: number) => {
		router.push(`/page/items/${id}`);
	}


	const finish = async (data: todoItem) => {
		setDone(prevList => [...prevList, data]);
		setList(list.filter(todo => todo !== data));
		await fetch(`api/items/${data.id}`, 
            { 
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
			    body: JSON.stringify({ isComplete: 1 })
            });
	}


    
    const todoList = list.map((data) => (
		<span className="colContainer" key={`${data.id}`}>
			<button className="check" onClick={() => finish(data)}></button>
			<span className="do" onClick={() => handleDetail(data.id)}>{data.name}</span>
		</span>
	))



    const notFinish = async (data: todoItem) => {
		setList(prevList => [...prevList, data]);
		setDone(done.filter(todo => todo !== data));
		await fetch(`api/items/${data.id}`, 
            { 
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
			    body: JSON.stringify({ isComplete: 0 })
            });
	}


	const doneList = done.map((data) => (
		<span className="colContainer" key={`${data.id}`}>
			<button className="check" onClick={() => notFinish(data)}></button>
			<span className="do" onClick={() => handleDetail(data.id)}>{data.name}</span>
		</span>
	))


    return (
        <>
            <span className="todoIcon"><b>TO DO</b></span>
            <span className="listFlex">{todoList}</span>

            <span className="todoIcon" style={{ left: 800 }}><b>DONE</b></span>
			<span className="listFlex" style={{ left: 795 }}>{doneList}</span>
        </>
    )
}

export default ShowItem