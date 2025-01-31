'use server';

import { revalidatePath } from 'next/cache';
import { fetchApi } from '@/utils/api';

export async function deleteFriend(friendId: number) {
    try {
        await fetchApi(`/rest/main/friends/${friendId}`, {
            method: 'DELETE'
        });
        
        revalidatePath('/');
    } catch (error) {
        console.error('Error deleting friend:', error);
        throw new Error('Failed to delete friend');
    }
}

export async function addFriend(name: string) {    
    try {
        await fetchApi('/rest/main/friends', {
            method: 'POST',
            body: { name }
        });

        revalidatePath('/');
    } catch (error) {
        console.error('Error adding friend:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to add friend');
    }
} 