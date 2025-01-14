"use client";


import Header from './components/main/Header';
import AddItem from './components/main/AddItem';
import ShowItem from './components/main/ShowItem';




export default function Home() {


	return (
		<>
			<Header>To-Do List</Header>

			<AddItem></AddItem>

			<ShowItem></ShowItem>
		</>
	);
}
