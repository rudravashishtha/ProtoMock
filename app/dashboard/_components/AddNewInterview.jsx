"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { schema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle, X } from "lucide-react";
import moment from "moment";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [numberofQuestions, setNumberofQuestions] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      "You are an AI interview question generator. Your task is to create a specified number of interview questions and brief answers for a given job role. Job Role/Position: " +
      jobPosition +
      " Job Skills/Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Number of Questions: " +
      numberofQuestions +
      ". Based on this data, generate relevant questions an interviewer might ask, along with concise answers that demonstrate a strong understanding of the role and required skills.Provide the questions and answers in the following JSON format.";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const resp = await db
        .insert(schema)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          numberOfQuestions: numberofQuestions,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY HH:mm:ss"),
        })
        .returning({ mockId: schema.mockId });
      // console.log("Id: ", resp);
      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      }
    }
    else {
      console.log("Error: ", result);
    }

    setLoading(false);
  };
  return (
    <div className="">
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-medium text-center">+ Add New Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your Job Position/Role, Job Description
                    and Years of Experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role / Job Position</label>
                    <Input
                      placeholder="Eg. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description / Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Eg. React.js, Next.js, MySql, Angular etc"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Eg. 4"
                      type="number"
                      max="100"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Number of Questions</label>
                    <Input
                      placeholder="Eg. 5"
                      type="number"
                      max="10"
                      required
                      onChange={(e) => setNumberofQuestions(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end outline-none">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="h-6 w-6 mr-2 animate-spin" />
                        Generating with AI{" "}
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
          <div
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer"
            onClick={() => setOpenDialog(false)}
          >
            <X className="h-4 w-4" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
