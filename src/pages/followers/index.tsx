import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, User } from "@nextui-org/react"
import { usersAPI } from "../../api/users-api"
import { Button } from "../../components/follow-button"
import { GoBack } from "../../components/go-back"

export const Followers = () => {
    const { data: user, } = usersAPI.useGetUsersQuery({})


    const followers = user?.items.filter(user => user.followed);
    if (!followers) {
        return null
    }
    return followers.length > 0 ? (
        <div className="gap-5 flex flex-col ">
            <GoBack />
            {followers.map((user) => (
                <>
                    <Link to={`/profile/${user.id}`}>
                        <Card>
                            <CardBody className="block">
                                <div className="flex justify-between items-center">
                                    <User
                                        key={user.id}
                                        name={user.name ?? ""}
                                        avatarProps={{ src: user.photos.large ?? "" }}
                                        description={user.status ?? ""}
                                    />
                                    <Button user={user} />
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                </>
            ))}
        </div>
    ) : (
        <>
            <GoBack />
            <h2>Вы не подписаны ни на кого</h2>
        </>
    )
}