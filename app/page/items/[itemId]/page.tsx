"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { redirect } from 'next/navigation';
import Image from 'next/image';
import InputName from "../../../components/detail/InputName";
import InputMemo from "../../../components/detail/InputMemo";
import { NameContext, MemoContext } from "../../../components/detail/ItemContext"




export default function Home() {
    const [name, setName] = useState<string>("");
    const [memo, setMemo] = useState<string>("");


    
    const path = usePathname();
    const pathParts = path.split('/');
    const id = pathParts[3];


    useEffect(() => {
        async function detailData() {
            const response = await fetch(`/api/items/${id}`);
            const result = await response.json();
            setName(result.data[0].name);
            setMemo(result.data[0].memo);
        }    

        detailData();
    }, [id]);


    const deleteItem = async (id: string) => {
        await fetch(`../../../api/items/${id}`, { method: "DELETE" });
        redirect('/');
    }


    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	}


    const changeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMemo(event.target.value);
	}


    const handleSubmit = async (id: string) => {
        await fetch(`../../../api/items/${id}`, 
            { 
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
			    body: JSON.stringify({ name: name, memo: memo })
            });
    }


    const handleClose = () => {
        redirect('/');
    }


    

    return (
        <>
            <div className="detailPage">
                <NameContext.Provider value={{name, changeName}}>
                    <InputName />
                </NameContext.Provider>

                <MemoContext.Provider value={{memo, changeMemo}}>
                    <InputMemo />
                </MemoContext.Provider>

                <Image src="/images/close.png" alt="Close Icon" width={35} height={35} className="closeImage" onClick={handleClose}/>
            </div>

            <Image src="/images/correction.png" alt="Check Icon" width={30} height={30} className="correctImage" onClick={() => handleSubmit(id)}/>
            <Image src="/images/trash.png" alt="Trash Icon" width={30} height={30} className="deleteImage" onClick={() => deleteItem(id)}/>
        </>
    )
}