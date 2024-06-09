"use client";
import { db } from "@/utils/db";
import { schema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(schema)
      .where(eq(schema.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(schema.id));

    setInterviewList(result);
    setLoading(false);
  };
  return (
    <div>
      <h2 className="font-medium text-2xl">Previous Interviews</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg "
              key={index}
            ></div>
          ))}
        </div>
      ) : interviewList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500 text-center mt-20">
          No Interview Record Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
