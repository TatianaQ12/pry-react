import { toast } from "react-hot-toast";
import { ExclamationCircleOutlined, BuildOutlined, FileTextOutlined, FileDoneOutlined } from '@ant-design/icons';

export const CustomSnackbar = (alert_type: string, message: string) => {
    switch (alert_type) {
        case "warning":
            return toast(message, {
                icon: <ExclamationCircleOutlined style={{ color: "orange" }} />,
            });
        case "success":
            return toast.success(message);
        case "error":
            return toast.error(message);
        case "earring":
            return toast(message, {
                icon: <BuildOutlined style={{ color: "blue" }} />,
            });
        case "document":
            return toast(message, {
                icon: <FileTextOutlined style={{ color: "blue" }} />,
            });
        case "signed":
            return toast(message, {
                icon: <FileDoneOutlined style={{ color: "brown" }} />,
            });
    }
};
