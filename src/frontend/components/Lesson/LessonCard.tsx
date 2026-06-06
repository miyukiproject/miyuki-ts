import { Link } from "react-router-dom"
import { ExercisesList } from "../../ExercisesList"
import { Heading2 } from "../Title"

type LessonCard = {
    lesson: any, //TODO tipar lesson:)
    id: number
}

export const LessonCard = ({ lesson, id }: LessonCard) => {

    return <div key={lesson.id} className="mb-8">
        <Heading2>
            {id}.{" "}
            <Link
                to={`/lessons/${id}`}
                className="text-blue-600 hover:underline">
                {lesson.name}
            </Link>
        </Heading2>

        <ExercisesList
            lessonId={`${id}`}
            exercises={lesson.exercises}
        />
    </div>
}