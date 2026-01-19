type EmptyStateProps = {
    message?: string;
};

const EmptyState = ({message}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-64">
            <h1 className="text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                {message ?? "Нет данных для отображения"}
            </h1>
        </div>
    );
};

export default EmptyState;
