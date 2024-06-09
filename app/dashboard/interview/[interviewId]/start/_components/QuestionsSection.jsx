import { Button } from "@/components/ui/button";
import { Lightbulb, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  handleQuestionClick,
}) {
  const [speaking, setSpeaking] = useState(false);
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      speech.onend = () => {
        setSpeaking(false);
      };
    } else {
      alert("Your browser does not support text to speech.");
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [activeQuestionIndex]);


  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index
                    ? "bg-primary text-white"
                    : "bg-secondary"
                }`}
                key={index}
                onClick={() => {
                  handleQuestionClick(index);
                  setSpeaking(false);
                  window.speechSynthesis.cancel();
                }}
              >
                {index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-base md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        {!speaking && (
          <Button
            className="flex cursor-pointer gap-2"
            onClick={() => {
              textToSpeech(
                mockInterviewQuestion[activeQuestionIndex]?.question
              );
              setSpeaking(!speaking);
            }}
          >
            <Volume2 />
            Listen to the question
          </Button>
        )}

        {speaking && (
          <Button
            className="flex cursor-pointer gap-2"
            onClick={() => {
              window.speechSynthesis.cancel();
              setSpeaking(!speaking);
            }}
          >
            <VolumeX />
            Stop Listening
          </Button>
        )}

        <div className="border rounded-lg p-5 bg-blue-100 mt-10">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            Click on 'Record Answer' to start recording your answer. You can
            stop the recording at any time. At the end of the interview, you
            will get a feedback along with the correct answer for each question.
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
