"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { schema } from "@/utils/schema";
import { eq, param } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  useEffect(() => {
    getInterviewDetails();
  }, []);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState();

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(schema)
      .where(eq(schema.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-7 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong className="mr-1">Job Role/Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong className="mr-1">Job Description/Tech Stack:</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong className="mr-1">Years of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
            <h2 className="text-lg">
              <strong className="mr-1">Number of Questions:</strong>
              {interviewData?.numberOfQuestions}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-2 text-yellow-600">
              Enable your Webcam and microphone to start your AI Generated Mock
              Interview. It has {interviewData?.numberOfQuestions} questions. At
              the end of the interview, you will get a report on the basis of
              your answers. NOTE: We do not record your video or audio. You can
              disable it at any time.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                width: 400,
                height: 400,
              }}
            />
          ) : (
            <div className="flex flex-col justify-center">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button
                className="m-auto px-10 w-fit"
                onClick={() => setWebCamEnabled(true)}
                variant="ghost"
              >
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link
          href={`/dashboard/interview/${params.interviewId}/start`}
        >
          <Button className=" px-10 w-fit">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
