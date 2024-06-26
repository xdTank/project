import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { useActions } from "../../hooks/useActions"
import { ErrorMessage } from "../error-message"
import { ProfileType } from "../../api/profile-api"
import { useAppSelector } from "../../hooks/redux"

export const CreatePost = () => {
    const { createPost } = useActions()
    const { profile } = useAppSelector(state => state.profile)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = handleSubmit((data) => {
        try {
            createPost({ content: data.post, authorId: profile?.userId ?? 0, author: profile ?? {} as ProfileType })
            setValue("post", "")
        } catch (error) {
            console.log("err", error)
        }
    })
    const error = errors?.post?.message as string

    return (
        <form className="flex-grow" onSubmit={onSubmit}>
            <Controller
                name="post"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="О чем думайте?"
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}
            <Button
                color="success"
                className="flex-end"
                endContent={<IoMdCreate />}
                type="submit"
            >
                Добавить пост
            </Button>
        </form>
    )
}