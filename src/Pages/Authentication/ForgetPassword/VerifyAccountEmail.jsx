import { useParams } from "react-router-dom";


const VerifyAccountEmail = () => {
    const {email}=useParams()
    console.log(email);
    return (
        <div>
            VerifyAccountEmail
        </div>
    );
};

export default VerifyAccountEmail;