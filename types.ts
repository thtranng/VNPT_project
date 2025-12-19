
export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: Participant[];
  status: 'PROCESSED' | 'PROCESSING' | 'COMPLETED';
  summary?: string;
  transcript?: TranscriptEntry[];
  actionItems?: ActionItem[];
  folder?: string;
}

export interface TranscriptEntry {
  speaker: string;
  avatar: string;
  time: string;
  text: string;
  isAi?: boolean;
}

export interface ActionItem {
  id: string;
  text: string;
  assignedTo: string;
  initials: string;
  color: string;
  dueDate: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
