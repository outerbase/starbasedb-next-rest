import { fetchApi } from '@/utils/api';
import DeleteFriendButton from '@/components/DeleteFriendButton';
import { deleteFriend, addFriend } from './actions';

interface Friend {
    id: number;
    name: string;
}

interface FriendsResponse {
    result: Friend[];
}

export default async function Home() {
    const data = await fetchApi<FriendsResponse>('/rest/main/friends');
    const friends = data.result;

    return (
        <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold mb-6">Friends</h1>
            
            <form 
                action={async (formData: FormData) => {
                    'use server';
                    const name = formData.get('name') as string;
                    if (!name) return;
                    await addFriend(name);
                }}
                className="mb-8 flex gap-2"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Enter friend's name"
                    required
                    className="flex-1 px-4 py-2 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add Friend
                </button>
            </form>

            <div className="space-y-4">
                {friends.map((friend) => (
                    <div 
                        key={friend.id} 
                        className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg shadow"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{friend.name}</h2>
                        </div>
                        <DeleteFriendButton 
                            friendId={friend.id}
                            onDelete={async () => {
                                'use server';
                                await deleteFriend(friend.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
