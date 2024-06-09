"use client";
import { db } from "@/utils/db";
import { schema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(schema)
      .where(eq(schema.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  const handleQuestionClick = (index) => {
    setActiveQuestionIndex(index);
  };

  function stopTextToSpeech() {
    window.speechSynthesis.cancel();
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          handleQuestionClick={handleQuestionClick}
        />

        {/* Video / Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6 mt-1">
        {activeQuestionIndex > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex - 1);
              stopTextToSpeech();
            }}
          >
            Previous Question
          </Button>
        )}

        {activeQuestionIndex < mockInterviewQuestion?.length - 1 && (
          <Button
            variant="secondary"
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
              stopTextToSpeech();
            }}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button variant="destructive">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
