"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-[1.6rem] text-green-800 font-bold mb-2">
            Congratulations! You have successfully completed the Interview.
          </h2>

          <h2 className="text-xl text-red-400 font-semibold flex gap-2 items-center">
            <Sticker />
            You can find the feedback below.
          </h2>

          {feedbackList &&
            feedbackList.map((feedback, index) => (
              <Collapsible key={index} className="mt-5">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg w-full my-2 text-left flex justify-between gap-7">
                  {feedback.question}{" "}
                  <ChevronsUpDown className="h-7 w-7 p-2 " />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {feedback.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {feedback.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {feedback.feedback}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Suggested Answer: </strong>
                      {feedback.correctAns}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

          <div className="flex justify-end items-center mt-10 gap-5">
            <Link
              href="https://buymeacoffee.com/rudravashishtha"
              target="_blank"
              className="text-blue-600"
            >
              <Button variant="link">Buy me a Coffee</Button>
            </Link>
            <Button
              onClick={() => router.replace("/dashboard")}
              variant="outline"
            >
              Go to Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
