import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/profileReducer";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getStatus } from "../../redux/profileReducer";
import { updateStatus } from "../../redux/profileReducer";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    render() {

        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />

        )
    }
}
function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
        userId: state.auth.id
    }
}



const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            {...{ params, }}
        />
    );
};


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)