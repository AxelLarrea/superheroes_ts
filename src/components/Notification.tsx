import { ToastContentProps } from "react-toastify";

type Props = ToastContentProps<{
    content: string;
    isSuccess?: boolean;
}>;

const Notification = ({ data }: Props) => {
    const { content, isSuccess } = data;

    const color = isSuccess ? 'text-green-500' : 'text-red-600';
    const defaultColor = 'text-slate-800';

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
                <p className={`${isSuccess === undefined ? defaultColor : color} font-medium text-base mx-auto`}>{content}</p>
            </div>
        </div>
    );
}
 
export default Notification;