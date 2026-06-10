import { Link } from "react-router-dom"
import { ExercisesList } from "../../ExercisesList"
import { Heading3 } from "../Title"

type LessonCard = {
    lesson: any, //TODO tipar lesson:)
    id: number
}

export const LessonCard = ({ lesson, id }: LessonCard) => {

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
        />
    </div>
}