import { Comment } from "@/types/chapter/comments";

export const comments: Comment[] = [
  {
    id: "125564",
    content:
      "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
    user_id: "user1",
    course_id: "125564",
    is_edited: false,
    created_at: new Date(),
    updated_at: new Date(),
    replays: [],
    user: {
      userId: "user1",
      avatar: "/store/img.jpg",
      email: "user1@example.com",
      group: "Group A",
      role: "student",
      username: "user1",
      id: "125564",
    },
  },
  {
    id: "125564",
    content:
      "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako. I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako. I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
    user_id: "user2",
    course_id: "125564",
    is_edited: true,
    created_at: new Date(),
    updated_at: new Date(),

    replays: [
      {
        id: "125564",
        content:
          "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.",
        user_id: "user3",
        is_edited: false,
        created_at: new Date(),
        updated_at: new Date(),
        user: {
          userId: "user3",
          avatar: "/store/img.jpg",
          email: "user3@example.com",
          group: "Group B",
          role: "student",
          username: "user3",
          id: "125564",
        },
      },
    ],
    user: {
      userId: "user2",
      avatar: "/store/img.jpg",
      email: "user2@example.com",
      group: "Group A",
      role: "instructor",
      username: "user2",
      id: "125564",
    },
  },
];
