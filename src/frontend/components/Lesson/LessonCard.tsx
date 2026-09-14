import { Link } from "react-router-dom"
import { ExercisesList } from "../../ExercisesList"
import { Heading3 } from "../Title"
import { useProgress } from "../../contexts/ProgressContext"

type LessonCard = {
    lesson: any, //TODO tipar lesson:)
    id: number
    chapterId: number
}

export const LessonCard = ({ lesson, id, chapterId }: LessonCard) => {
    const { bookProgress } = useProgress();

    return <div key={lesson.id} className="mb-8">
        <Heading3>
            {id}.{" "}
            <Link
                to={`/lessons/${id}`}
                className="hover:underline">
                {lesson.name}
            </Link>
        </Heading3>

        <ExercisesList
            lessonId={`${id}`}
            exercises={lesson.exercises}
            bookProgress={bookProgress}
            chapterId={chapterId}
            lessonIdNum={lesson.id}
        />
    </div>
}