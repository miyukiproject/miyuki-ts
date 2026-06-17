import { Link, useParams } from "react-router-dom"
import { ExercisesList } from "../../ExercisesList"
import { Heading3 } from "../Title"

type LessonCard = {
    lesson: any, //TODO tipar lesson:)
    id: number
}

export const LessonCard = ({ lesson, id }: LessonCard) => {
    const { chapterId } = useParams();

    return <div key={lesson.id} className="mb-8">
        <Heading3>
            {id}.{" "}
            <Link
                to={`/chapters/${chapterId}/lessons/${id}`}
                className="hover:underline">
                {lesson.name}
            </Link>
        </Heading3>

        <ExercisesList
            chapterId={chapterId}
            lessonId={`${id}`}
            exercises={lesson.exercises}
        />
    </div>
}