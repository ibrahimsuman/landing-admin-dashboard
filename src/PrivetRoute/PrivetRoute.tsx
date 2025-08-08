import { useUserStore } from "@/store/useUser";

type PrivetRouteProps = {
    children: React.ReactNode;
};

const PrivetRoute = ({ children }: PrivetRouteProps) => {
    const user = useUserStore((state) => state.user);

    if (user === undefined || user === null) {
        window.location.href = "/"
        return <div>Loading...</div>;
    }

    if (user.role !== "admin") {

        window.location.href = "/";

        return null;
    }

    return <>{children}</>;
};

export default PrivetRoute;
