import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICourse {
  id: number;
  name: string;
  classes: IClass[];
}
export interface IClass {
  id: number;
  name: string;
  link: string;
  type: "youtube";
  description?: string;
  percent: number;
}
export interface ICoursesState {
  myCourses: ICourse[];
  courseLastInsertId: number;
  classLastInsertId: number;
}

const initialState: ICoursesState = {
  myCourses: [
    {
      name: "C++ Programming for Beginners Part 1",
      id: 989,
      classes: [
        {
          id: 58,
          name: "Introduction to Programming",
          link: "https://www.youtube.com/watch?v=S3nx34WFXjI",
          type: "youtube",
          percent: 0,
        },
        {
          id: 2,
          name: "Variables and basic data types ✗",
          link: "https://www.youtube.com/embed/4psGUiKacPQ",
          type: "youtube",
          percent: 0,
        },
        {
          id: 3,
          name: "What is a const? 🚫",
          link: "https://www.youtube.com/watch?v=MwQEaCsS6UM&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=3",
          type: "youtube",
          percent: 0,
        },
        {
          id: 4,
          name: "What are namespaces? 📛",
          link: "https://www.youtube.com/watch?v=2lcIKzFHjSM",
          type: "youtube",
          percent: 0,
        },
        {
          id: 5,
          name: "Typedef and type aliases",
          link: "https://www.youtube.com/watch?v=7TJ7Z1-V_24",
          type: "youtube",
          percent: 0,
        },
        {
          id: 6,
          name: "What are arithmetic operators? 🧮",
          link: "https://www.youtube.com/watch?v=6am27D60i84",
          type: "youtube",
          percent: 0,
        },
        {
          id: 7,
          name: "What is type conversion? ✨",
          link: "https://www.youtube.com/watch?v=Fj9HjbqHto8",
          type: "youtube",
          percent: 0,
        },
        {
          id: 8,
          name: "What are arithmetic operators? 🧮",
          link: "https://www.youtube.com/watch?v=6am27D60i84",
          type: "youtube",
          percent: 0,
        },
        {
          id: 9,
          name: "How to accept user input in C++? 🧮",
          link: "https://www.youtube.com/watch?v=imiIhu9u670",
          type: "youtube",
          percent: 0,
        },
        {
          id: 10,
          name: "What are arithmetic operators? 🧮",
          link: "https://www.youtube.com/watch?v=6am27D60i84",
          type: "youtube",
          percent: 0,
        },
        {
          id: 11,
          name: "Useful math related functions in C++ 🔢",
          link: "https://www.youtube.com/watch?v=LXq3OhajeeU",
          type: "youtube",
          percent: 0,
        },
        {
          id: 12,
          name: "C++ Hypotenuse calculator practice program 📐",
          link: "https://www.youtube.com/watch?v=LvfUeY4-_1k",
          type: "youtube",
          percent: 0,
        },
      ],
    },
    {
      name: "C++ Programming for beginners Part 2",
      id: 1,
      classes: [
        {
          id: 1,
          name: "What are overloaded functions? 🍕",
          link: "https://www.youtube.com/watch?v=LZd5LhfnYsk&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=28",
          type: "youtube",
          percent: 0,
        },
        {
          id: 2,
          name: "What is variable scope? 🌎",
          link: "https://www.youtube.com/watch?v=Q7ZFHAO-oxI&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=29",
          type: "youtube",
          percent: 0,
        },
        {
          id: 3,
          name: "Banking program written in C++ 💰",
          link: "https://www.youtube.com/watch?v=TJOysgQkqZY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=30",
          type: "youtube",
          percent: 0,
        },
        {
          id: 4,
          name: "C++ ROCK PAPER SCISSORS game 👊",
          link: "https://www.youtube.com/watch?v=F4jzY6YVw4w&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=31",
          type: "youtube",
          percent: 0,
        },
        {
          id: 5,
          name: "Typedef and type aliases",
          link: "https://www.youtube.com/watch?v=7TJ7Z1-V_24&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=5",
          type: "youtube",
          percent: 0,
        },
        {
          id: 6,
          name: "What are arrays? 🚗",
          link: "https://www.youtube.com/watch?v=QFrJQq6Iox8&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=32",
          type: "youtube",
          percent: 0,
        },
        {
          id: 7,
          name: "What is the sizeof() operator? ⚖️",
          link: "https://www.youtube.com/watch?v=1_YDHY_34Bg&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=33",
          type: "youtube",
          percent: 0,
        },
        {
          id: 8,
          name: "How to iterate over an array? 🗃️",
          link: "https://www.youtube.com/watch?v=a4P4ial8OgQ&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=34",
          type: "youtube",
          percent: 0,
        },
        {
          id: 9,
          name: "What is a foreach loop? 🗂️",
          link: "https://www.youtube.com/watch?v=qnEUB25TRaY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=35",
          type: "youtube",
          percent: 0,
        },
        {
          id: 10,
          name: "How to pass arrays to functions? 💵",
          link: "https://www.youtube.com/watch?v=VQSroKMqISE&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=36",
          type: "youtube",
          percent: 0,
        },
      ],
    },
    {
      name: "C++ Programming for Intermediary",
      id: 2,
      classes: [
        {
          id: 11,
          name: "What are overloaded functions? 🍕",
          link: "https://www.youtube.com/watch?v=LZd5LhfnYsk",
          type: "youtube",
          percent: 0,
        },
        {
          id: 12,
          name: "What is variable scope? 🌎",
          link: "https://www.youtube.com/watch?v=Q7ZFHAO-oxI",
          type: "youtube",
          percent: 0,
        },
        {
          id: 13,
          name: "Banking program written in C++ 💰",
          link: "https://www.youtube.com/watch?v=TJOysgQkqZY",
          type: "youtube",
          percent: 0,
        },
        {
          id: 14,
          name: "C++ ROCK PAPER SCISSORS game 👊",
          link: "https://www.youtube.com/watch?v=F4jzY6YVw4w",
          type: "youtube",
          percent: 0,
        },
        {
          id: 15,
          name: "Typedef and type aliases",
          link: "https://www.youtube.com/watch?v=7TJ7Z1-V_24",
          type: "youtube",
          percent: 0,
        },
        {
          id: 16,
          name: "What are arrays? 🚗",
          link: "https://www.youtube.com/watch?v=QFrJQq6Iox8",
          type: "youtube",
          percent: 0,
        },
        {
          id: 17,
          name: "What is the sizeof() operator? ⚖️",
          link: "https://www.youtube.com/watch?v=1_YDHY_34Bg",
          type: "youtube",
          percent: 0,
        },
        {
          id: 18,
          name: "How to iterate over an array? 🗃️",
          link: "https://www.youtube.com/watch?v=a4P4ial8OgQ",
          type: "youtube",
          percent: 0,
        },
        {
          id: 19,
          name: "What is a foreach loop? 🗂️",
          link: "https://www.youtube.com/watch?v=qnEUB25TRaY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=35",
          type: "youtube",
          percent: 0,
        },
        {
          id: 10,
          name: "How to pass arrays to functions? 💵",
          link: "https://www.youtube.com/watch?v=VQSroKMqISE&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=36",
          type: "youtube",
          percent: 0,
        },
      ],
    },
    {
      name: "C++ Programming for Advanced",
      id: 4,
      classes: [
        {
          id: 20,
          name: "What are overloaded functions? 🍕",
          link: "https://www.youtube.com/watch?v=LZd5LhfnYsk&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=28",
          type: "youtube",
          percent: 0,
        },
        {
          id: 21,
          name: "What is variable scope? 🌎",
          link: "https://www.youtube.com/watch?v=Q7ZFHAO-oxI&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=29",
          type: "youtube",
          percent: 0,
        },
        {
          id: 22,
          name: "Banking program written in C++ 💰",
          link: "https://www.youtube.com/watch?v=TJOysgQkqZY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=30",
          type: "youtube",
          percent: 0,
        },
        {
          id: 23,
          name: "C++ ROCK PAPER SCISSORS game 👊",
          link: "https://www.youtube.com/watch?v=F4jzY6YVw4w&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=31",
          type: "youtube",
          percent: 0,
        },
        {
          id: 24,
          name: "Typedef and type aliases",
          link: "https://www.youtube.com/watch?v=7TJ7Z1-V_24&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=5",
          type: "youtube",
          percent: 0,
        },
        {
          id: 25,
          name: "What are arrays? 🚗",
          link: "https://www.youtube.com/watch?v=QFrJQq6Iox8&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=32",
          type: "youtube",
          percent: 0,
        },
        {
          id: 26,
          name: "What is the sizeof() operator? ⚖️",
          link: "https://www.youtube.com/watch?v=1_YDHY_34Bg&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=33",
          type: "youtube",
          percent: 0,
        },
        {
          id: 27,
          name: "How to iterate over an array? 🗃️",
          link: "https://www.youtube.com/watch?v=a4P4ial8OgQ&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=34",
          type: "youtube",
          percent: 0,
        },
        {
          id: 28,
          name: "What is a foreach loop? 🗂️",
          link: "https://www.youtube.com/watch?v=qnEUB25TRaY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=35",
          type: "youtube",
          percent: 0,
        },
        {
          id: 29,
          name: "How to pass arrays to functions? 💵",
          link: "https://www.youtube.com/watch?v=VQSroKMqISE&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=36",
          type: "youtube",
          percent: 0,
        },
      ],
    },
    {
      name: "C++ Programming extra skills",
      id: 3,
      classes: [
        {
          id: 30,
          name: "What are overloaded functions? 🍕",
          link: "https://www.youtube.com/watch?v=LZd5LhfnYsk&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=28",
          type: "youtube",
          percent: 0,
        },
        {
          id: 300,
          name: "What is variable scope? 🌎",
          link: "https://www.youtube.com/watch?v=Q7ZFHAO-oxI&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=29",
          type: "youtube",
          percent: 0,
        },
        {
          id: 32,
          name: "Banking program written in C++ 💰",
          link: "https://www.youtube.com/watch?v=TJOysgQkqZY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=30",
          type: "youtube",
          percent: 0,
        },
        {
          id:33,
          name: "C++ ROCK PAPER SCISSORS game 👊",
          link: "https://www.youtube.com/watch?v=F4jzY6YVw4w&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=31",
          type: "youtube",
          percent: 0,
        },
        {
          id: 34,
          name: "Typedef and type aliases",
          link: "https://www.youtube.com/watch?v=7TJ7Z1-V_24&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=5",
          type: "youtube",
          percent: 0,
        },
        {
          id:35,
          name: "What are arrays? 🚗",
          link: "https://www.youtube.com/watch?v=QFrJQq6Iox8&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=32",
          type: "youtube",
          percent: 0,
        },
        {
          id: 36,
          name: "What is the sizeof() operator? ⚖️",
          link: "https://www.youtube.com/watch?v=1_YDHY_34Bg&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=33",
          type: "youtube",
          percent: 0,
        },
        {
          id: 37,
          name: "How to iterate over an array? 🗃️",
          link: "https://www.youtube.com/watch?v=a4P4ial8OgQ&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=34",
          type: "youtube",
          percent: 0,
        },
        {
          id: 38,
          name: "What is a foreach loop? 🗂️",
          link: "https://www.youtube.com/watch?v=qnEUB25TRaY&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=35",
          type: "youtube",
          percent: 0,
        },
        {
          id: 39,
          name: "How to pass arrays to functions? 💵",
          link: "https://www.youtube.com/watch?v=VQSroKMqISE&list=PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on&index=36",
          type: "youtube",
          percent: 0,
        },
      ],
    },
  ],
  courseLastInsertId: 1000,
  classLastInsertId: 1000,
};
export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setClassProgressPercent: (
      state,
      action: PayloadAction<{
        courseId: number;
        classId: number;
        percent: number;
      }>
    ) => {
      //notworking because youtube blocks.
      state.myCourses
        .find((x) => x.id === action.payload.courseId)!
        .classes.find((x) => x.id === action.payload.classId)!.percent =
        action.payload.percent;
    },
    deleteCourse(state, action: PayloadAction<{ courseId: number }>) {
      state.myCourses.splice(
        state.myCourses.findIndex((x) => x.id === action.payload.courseId)
      );
    },
    addCourse(state, action: PayloadAction<{ course: ICourse }>) {
      state.myCourses.push({
        ...action.payload.course,
        id: state.courseLastInsertId,
        classes: action.payload.course.classes.map((x) => {
          const class_ = { ...x };
          if (class_.id === 0) {
            class_.id = state.classLastInsertId;
            state.classLastInsertId++;
          }
          return x;
        }),
      });
      state.courseLastInsertId++;
    },
    updateCourse(state, action: PayloadAction<{ course: ICourse }>) {
      state.myCourses = state.myCourses.map((x) => {
        if (x.id !== action.payload.course.id) return x;
        return { ...action.payload.course };
      });
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setClassProgressPercent,
  deleteCourse,
  addCourse,
  updateCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
