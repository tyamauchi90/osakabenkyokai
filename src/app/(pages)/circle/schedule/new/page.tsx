"use client";
import CreateEventForm from "./CreateEventForm";

export default function CreateEvent() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-2xl font-semibold mb-4">勉強会（新規作成）</h1>
        <CreateEventForm />
      </div>
    </>
  );
}
