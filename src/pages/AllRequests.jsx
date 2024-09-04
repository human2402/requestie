
import React from 'react';
import TaskList from '/src/components/TaskList.jsx';

const tasks = [
  {
    id: 1,
    status: "Pending",
    time: "2023-09-01 12:00",
    title: "Issue with lights",
    type: "Maintenance",
    description: "The lights in the hallway are flickering.",
    location: "Building A, 2nd Floor",
    contact: "John Doe, 555-1234"
  },
  {
    id: 2,
    status: "Completed",
    time: "2023-09-02 15:00",
    title: "Broken window",
    type: "Repair",
    description: "The window in room 204 is broken.",
    location: "Building B, Room 204",
    contact: "Jane Smith, 555-5678"
  },
  {
    id: 3,
    status: "In Progress",
    time: "2023-09-03 09:30",
    title: "Leaky faucet",
    type: "Maintenance",
    description: "The faucet in the kitchen is leaking.",
    location: "Building C, Kitchen",
    contact: "Alice Johnson, 555-8765"
  },
  {
    id: 4,
    status: "Pending",
    time: "2023-09-01 12:00",
    title: "Issue with lights",
    type: "Maintenance",
    description: "The lights in the hallway are flickering.",
    location: "Building A, 2nd Floor",
    contact: "John Doe, 555-1234"
  },
  {
    id: 5,
    status: "Completed",
    time: "2023-09-02 15:00",
    title: "Broken window",
    type: "Repair",
    description: "The window in room 204 is broken.",
    location: "Building B, Room 204",
    contact: "Jane Smith, 555-5678"
  },
  {
    id: 6,
    status: "In Progress",
    time: "2023-09-03 09:30",
    title: "Leaky faucet",
    type: "Maintenance",
    description: "The faucet in the kitchen is leaking.",
    location: "Building C, Kitchen",
    contact: "Alice Johnson, 555-8765"
  }
];

function AllRequests() {
  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default AllRequests;
