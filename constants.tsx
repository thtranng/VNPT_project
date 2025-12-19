
import { Meeting, Participant, ActionItem } from './types';

export const CURRENT_USER: Participant = {
  id: 'u1',
  name: 'Isabella Anderson',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv2dz8EeN4SfGKTFT44KSjbIQ7yy1f5hKKfqW6j5YvgTwbI1fP4zvfYTpA4qjPJc3W2HaKJE3bJb0wUNQ-SNJT1M8Dg_vgzSJ39jKceybd6rvX0h4daxNfJcSiOp0woMucfIT5IDo8HUQlky2kBzZg2wk_1xD5huQwqoU7Xn514d4xIDfM73101ghRxlfy8YFakDohEa8g-4gIENWmhsVA9ZRjV1ZE8dKZKQCiTDpMFYlo7vGolGQyMKnmEWlJJLrbfusEWrGO1n4',
  role: 'Product Lead'
};

export const MOCK_PARTICIPANTS: Participant[] = [
  { id: 'p1', name: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv2dz8EeN4SfGKTFT44KSjbIQ7yy1f5hKKfqW6j5YvgTwbI1fP4zvfYTpA4qjPJc3W2HaKJE3bJb0wUNQ-SNJT1M8Dg_vgzSJ39jKceybd6rvX0h4daxNfJcSiOp0woMucfIT5IDo8HUQlky2kBzZg2wk_1xD5huQwqoU7Xn514d4xIDfM73101ghRxlfy8YFakDohEa8g-4gIENWmhsVA9ZRjV1ZE8dKZKQCiTDpMFYlo7vGolGQyMKnmEWlJJLrbfusEWrGO1n4' },
  { id: 'p2', name: 'Devin Miller', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEzQZnWKSQpOfWLG4ex3maAkIEx-Tsc_EfovL17qiQ7MVncgCtsjwl9IyPCYFJkwQb5aJ7Y485L-Lcxg4V8yxEkRSdEQq8kAd50qHwat2hKY7_SCIJYzOiQGsq0a9IABL8UO0FKvEOGWzCLXbqFpwrl4v-D6X0iMEYcYpOwyPEF9N3aFxJfdhWo0tEDoOV9zgvM4DFY_wQEOruYGDyqKj_TEa-KghkWgtc0jKdjPeF6QdxLw6wjNFgiz4v5Dzdrdrigd097Ft7sPs' },
  { id: 'p3', name: 'Alex Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADJCviTbYHsWdvPBLhLm5x59jodPr6UAliHXoWV82aklxHHWzB8bco6pulSAreOeJsepkLLbUURn9IsRe7hvp5rrRaX2FIYgSYhrvtvu6uxa7MKglnlm9vJcf8v28JDvfdVYyypfex2vP5pLlXJXTs4JguDwQjaIuDyzp057ZlPV-4Cl5LCFu1_jr0dpQeA__N1iOHKoHlIkG2v1ea8ASXsmOUzXlEn5Ma5PjncMs2QHZfcn0pMWokGpQIbnxWDQBcgKzdGauH8co' },
  { id: 'p4', name: 'Alice Smith', avatar: 'https://picsum.photos/id/101/64/64' },
  { id: 'p5', name: 'Mike Ross', avatar: 'https://picsum.photos/id/102/64/64' }
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Q3 Product Strategy Sync',
    date: 'Oct 24, 2023',
    time: '2:00 PM - 2:45 PM',
    duration: '45 min',
    status: 'COMPLETED',
    participants: MOCK_PARTICIPANTS.slice(0, 5),
    summary: 'The team discussed the Q4 launch timeline. Alice confirmed marketing assets are on track for Friday. Isabella raised concerns about QA buffers.',
    transcript: [
      { speaker: 'Sarah Jenkins', avatar: MOCK_PARTICIPANTS[0].avatar, time: '02:14', text: "Alright everyone, let's get started. I wanted to focus primarily on the churn rate we observed last month." },
      { speaker: 'Devin Miller', avatar: MOCK_PARTICIPANTS[1].avatar, time: '02:35', text: "I dug into the data yesterday. Most of it seems to be coming from the legacy enterprise accounts." },
      { speaker: 'Sarah Jenkins', avatar: MOCK_PARTICIPANTS[0].avatar, time: '03:01', text: "That makes sense. Can we set up an automated email campaign to target those specific users?" }
    ],
    actionItems: [
      { id: 'a1', text: 'Export legacy account list', assignedTo: 'Devin', initials: 'DM', color: 'bg-purple-100 text-purple-700', dueDate: 'Due Fri', completed: false },
      { id: 'a2', text: 'Draft email campaign tutorial', assignedTo: 'Alex', initials: 'AC', color: 'bg-orange-100 text-orange-700', dueDate: 'Due Fri', completed: false },
      { id: 'a3', text: 'Review churn metrics next week', assignedTo: 'Sarah', initials: 'SJ', color: 'bg-blue-100 text-blue-700', dueDate: 'Due Mon', completed: true }
    ]
  },
  {
    id: 'm2',
    title: 'Weekly Design Sync',
    date: 'Oct 25, 2023',
    time: '10:00 AM',
    duration: '30 min',
    status: 'PROCESSED',
    participants: MOCK_PARTICIPANTS.slice(0, 3)
  },
  {
    id: 'm3',
    title: 'Client Onboarding',
    date: 'Oct 25, 2023',
    time: '11:00 AM',
    duration: '1h',
    status: 'PROCESSING',
    participants: [MOCK_PARTICIPANTS[3]]
  }
];
