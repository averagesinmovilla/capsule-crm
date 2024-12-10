import { FunctionComponent } from 'react';

type AuthSessionStatusProps = {
    status: string | null;
    className: string;
}

const AuthSessionStatus: FunctionComponent<AuthSessionStatusProps> = ({ status, className, ...props }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
