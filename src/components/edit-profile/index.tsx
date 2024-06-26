import {
    Button,
    Checkbox,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { ThemeContext } from "../theme-provider"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../error-message"
import { MdOutlineEmail } from "react-icons/md"
import { ProfileType, profileApi } from "../../api/profile-api"
import { Input } from "../input"
import { message } from "antd"

type Props = {
    isOpen: boolean
    onClose: () => void
    user?: ProfileType
    refetchProfile: () => void
}

export const EditProfile: React.FC<Props> = ({
    isOpen = false,
    onClose = () => null,
    user,
    refetchProfile
}) => {
    const { theme } = useContext(ThemeContext)
    const [saveProfile, { isLoading }] = profileApi.useSaveProfileMutation()
    const [savePhoto] = profileApi.useSavePhotoMutation()
    const [error, setError] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const { handleSubmit, control } = useForm<ProfileType>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            fullName: user?.fullName,
            aboutMe: user?.aboutMe,
            lookingForAJob: user?.lookingForAJob,
            lookingForAJobDescription: user?.lookingForAJobDescription,
        },
    })

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedFile(event.target.files[0])
        }

    }


    const onSubmit = async (data: ProfileType) => {
        try {
            await saveProfile(data)
            const formData = new FormData()
            selectedFile && formData.append("image", selectedFile)
            beforeUpload(selectedFile as File)
            await savePhoto(formData)
            onClose()
            refetchProfile()
        } catch (err) {
            console.log(err)
            if (hasErrorField(err)) {
                setError(err.data.error)
            }
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={`${theme} text-foreground`}
            backdrop="blur"
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Изменения профиля
                        </ModalHeader>
                        <ModalBody>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >

                                <Input control={control} name="fullName" label="Имя" type="text" />
                                <input
                                    name="image"
                                    placeholder="Выберете файл"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <Input
                                    control={control}
                                    name="dateOfBirth"
                                    label="Дата Рождения"
                                    type="date"
                                    placeholder="Мой"
                                />
                                <Controller
                                    name="aboutMe"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            rows={4}
                                            label="Биография"
                                        />
                                    )}
                                />
                                <div className="flex gap-2 items-center">
                                    <p className="text-foreground">Ищу работу</p>
                                    <Checkbox
                                        name="lookingForAJob"
                                        type="checkbox"

                                    />
                                </div>
                                <Controller
                                    name="lookingForAJobDescription"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            rows={4}
                                            label="Описание работы"
                                        />
                                    )}
                                />

                                <ErrorMessage error={error} />
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        isLoading={isLoading}
                                    >
                                        Обновить профиль
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}