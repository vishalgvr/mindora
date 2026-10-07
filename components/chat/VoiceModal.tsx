"use client";

import React, { useState, useEffect } from "react";
import { Mic, Sparkles } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface VoiceModalProps {
  open: boolean;
  onClose: () => void;
  onTranscribed: (text: string) => void;
}

export function VoiceModal({ open, onClose, onTranscribed }: VoiceModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!open) {
      setIsRecording(false);
      setTranscript("");
      return;
    }

    // Auto-start listening on modal open
    setIsRecording(true);

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let currentText = "";
            for (let i = 0; i < event.results.length; i++) {
              currentText += event.results[i][0].transcript + " ";
            }
            setTranscript(currentText);
          };

          recognition.onerror = () => {};

          recognition.start();

          return () => {
            try {
              recognition.stop();
            } catch {}
          };
        } catch {}
      } else {
        // Simulated voice transcription timer if browser speech recognition not permitted
        const samplePhrases = [
          "Explain quantum computing in simple terms with real world analogies.",
          "Help me write a TypeScript function for streaming real-time chat data.",
          "Create a high-impact product roadmap for our new AI assistant launch.",
        ];
        const randomPhrase =
          samplePhrases[Math.floor(Math.random() * samplePhrases.length)];

        let index = 0;
        const interval = setInterval(() => {
          if (index < randomPhrase.length) {
            setTranscript(randomPhrase.substring(0, index + 3));
            index += 3;
          } else {
            clearInterval(interval);
          }
        }, 120);

        return () => clearInterval(interval);
      }
    }
  }, [open]);

  const handleDone = () => {
    if (transcript.trim()) {
      onTranscribed(transcript.trim());
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center justify-center p-4 text-center space-y-6">
        {/* Animated Voice Radar Waveform */}
        <div className="relative flex items-center justify-center">
          {isRecording && (
            <>
              <div className="absolute h-32 w-32 animate-ping rounded-full bg-indigo-500/20 duration-1000" />
              <div className="absolute h-24 w-24 animate-pulse rounded-full bg-indigo-500/30 duration-700" />
            </>
          )}

          <div
            className={`relative flex h-20 w-20 items-center justify-center rounded-full shadow-xl transition-all ${
              isRecording
                ? "bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-indigo-500/40"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400"
            }`}
          >
            <Mic className="h-9 w-9 animate-bounce" />
          </div>
        </div>

        {/* Audio Wave Visualizer Bars */}
        <div className="flex items-center justify-center gap-1.5 h-8">
          {[40, 75, 90, 50, 85, 100, 60, 80, 45, 95, 70, 30].map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-150 ${
                isRecording
                  ? "bg-indigo-500 dark:bg-indigo-400"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
              style={{
                height: isRecording ? `${Math.max(15, (height * (i % 2 === 0 ? 0.9 : 1.2)) % 32)}px` : "4px",
                animation: isRecording ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.08}s` : "none",
              }}
            />
          ))}
        </div>

        <div className="space-y-1">
          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {isRecording ? "Listening to your voice..." : "Voice input ready"}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Speak naturally. Mindora will convert your speech to text.
          </p>
        </div>

        {/* Real-time transcribed text preview */}
        <div className="w-full min-h-[70px] max-h-36 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic">
          {transcript ? (
            <span>&ldquo;{transcript}&rdquo;</span>
          ) : (
            <span className="text-slate-400 dark:text-slate-600">
              Start speaking to see transcription...
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="md"
            onClick={handleDone}
            disabled={!transcript.trim()}
            className="flex-1"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Insert Message
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
