import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TextSpeaker = () => {
    const [text, setText] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = () => {
        if (!text) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="space-y-4 p-4 max-w-md">
            <Input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to speak..."
                className="w-full"
            />

            <div className="flex gap-2">
                <Button onClick={speak} disabled={isSpeaking || !text}>
                    Speak
                </Button>

                {isSpeaking && (
                    <Button onClick={stopSpeaking} variant="destructive">
                        Stop
                    </Button>
                )}
            </div>
        </div>
    );
};

export default TextSpeaker;
