'use client'
import Link from "next/link";
import router from "next/router";
import { FormEvent, useState } from "react";

export default function AddGoal() {
    const [goal, setGoal] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // sending the POST request to the API endpoint
            const res = await fetch('/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    goal
                }),
            });

            if (res.ok) {
                router.push('/goals');
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }

    };
    return (
        <main className=" items-center h-screen justify-center flex flex-col">
            <form onClick={handleSubmit}>
                <input
                    type="text"
                    id="goal"
                    name="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Send a message"
                    className=" text-white py-2 input input-bordered w-full mr-5"
                />
                <button type="submit" className='btn btn-wide  hover:btn-outline btn-primary'>Submit</button>
                <Link href={'/goals'} className='btn btn-wide hover:btn-primary btn-outline btn-primary'>Go Back</Link>
            </form>
        </main>
    )
}