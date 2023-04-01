'use client';


import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "../lib/fetchSuggestionFromChatGPT";
import React, { FormEvent } from 'react'
import { useState } from 'react'
import { json } from "stream/consumers";
import useSWR from 'swr'
import toast from "react-hot-toast";

function PromptInput() {
    const [input, setInput] = useState('')
    const {
        data: suggestion,
        isLoading,
        mutate,
        isValidating,
    } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false,
    });
    const { mutate: updateImages } = useSWR('images', fetchImages, {
        revalidateOnFocus: false,
    })
    const submitPrompt = async (useSuggestion?: boolean) => {
        const inputPrompt = input;
        setInput("");
        console.log(inputPrompt);
        //p is the prompt which will be sent to the api
        const p = useSuggestion ? suggestion : inputPrompt;
        const notificationPrompt = p;
        const notificationPromptShort = notificationPrompt.slice(0, 20);
        const notification = toast.loading(`DALL.E is creating ${notificationPromptShort}...`)
        const res = await fetch('/api/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: p }),
        });
        const data = await res.json();
        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success(`Your AI Art has been Generated!`, {
                id: notification,
            });
        }
        updateImages();
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await submitPrompt();
    }
    const loading = isLoading || isValidating;
    return (
        <div className='m-10'>
            <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x'>
                <textarea className='flex-1 rounded-md outline-none p-4'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={(loading && "ChatGPT is thinking of a suggestion") || suggestion || 'Enter a Prompt...'}
                />
                <button type='submit'
                    className={`p-4 font-bold ${input ? "bg-red-500 text-white transition-colors duration-200"
                        : "text-gray-300 cursor-not-allowed"} `}
                    disabled={!input}>Generate</button>
                <button className='p-4 bg-red-400 transition-colors duration-200 font-bold
                 text-white disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400 '
                    type='button'
                    onClick={() => submitPrompt(true)}
                >Use Suggestion</button>
                <button className='p-4 bg-white text-red-400 border-none transition-colors duration-200 
                rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold'
                    type='button'
                    onClick={mutate}>New Suggestion</button>
            </form>
            {
                input && (
                    <p className="pt-2 pl-2 font-light">
                        Suggestion:{" "}
                        <span className="text-red-500">
                            {loading ? "ChatGPT is thinking" : suggestion}
                        </span>
                    </p>
                )
            }
        </div>
    )
}

export default PromptInput
