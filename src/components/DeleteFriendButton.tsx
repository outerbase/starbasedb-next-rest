'use client';

interface DeleteFriendButtonProps {
    friendId: number;
    onDelete: () => Promise<void>;
}

export default function DeleteFriendButton({ onDelete }: DeleteFriendButtonProps) {
    return (
        <button
            onClick={onDelete}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
        >
            Delete
        </button>
    );
} 