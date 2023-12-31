import { addPostActionCreator } from "../../../redux/profileReducer"
import Myposts from "./Myposts";
import { connect } from "react-redux";



const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        }

    }
}
const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts)

export default MypostsContainer