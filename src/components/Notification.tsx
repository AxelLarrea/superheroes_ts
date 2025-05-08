import { ToastContentProps } from "react-toastify";

type Props = ToastContentProps<{
    content: string;
    isSuccess?: boolean;
}>;

const Notification = ({ data }: Props) => {
    const { content, isSuccess } = data;

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
                <p className={`${isSuccess ? 'text-green-500' : 'text-red-600'} font-medium text-base mx-auto`}>{content}</p>
            </div>
        </div>
    );
}
 
export default Notification;