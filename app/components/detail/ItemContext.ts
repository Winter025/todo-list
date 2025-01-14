import React, { createContext, useState} from 'react';



interface nameContextType {
    name: string,
    changeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


interface memoContextType {
    memo: string,
    changeMemo: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}



export const NameContext = createContext<nameContextType|null>(null);

export const MemoContext = createContext<memoContextType|null>(null);
