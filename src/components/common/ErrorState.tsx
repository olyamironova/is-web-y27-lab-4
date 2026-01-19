type ErrorStateProps = {
    message?: string;
};

const ErrorState = ({message}: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-64">
            <h1 className="text-center text-2xl font-semibold text-red-500 dark:text-red-400">
                {message ?? "Произошла ошибка при загрузке данных"}
            </h1>
        </div>
    );
};

export default ErrorState;
