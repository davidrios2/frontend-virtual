import { LoginFaceBookBtn, LoginGoogleBtn } from "components/Button/login-btn";

export function SocialMediaLogin() {
    return (
        <div>
            <div className="flex justify-center">
                <LoginGoogleBtn />
            </div>
            <br></br>
            {/* <div className="flex justify-center">
                <LoginFaceBookBtn />
            </div> */}
        </div>
    )
}