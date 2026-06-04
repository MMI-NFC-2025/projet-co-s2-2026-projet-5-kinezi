iimport { pb } from './pb.js';

export async function addXp(xpReward) {
  if (!pb.authStore.isValid || !pb.authStore.model) return;

  const user = pb.authStore.model;

  try {
    const freshUser = await pb.collection('users').getOne(user.id);
    
    const newXp = (freshUser.xp || 0) + xpReward;

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const lastActivity = freshUser.last_activity ? freshUser.last_activity.split(' ')[0] : null;

    let newStreak = freshUser.streak || 0;

    if (lastActivity !== todayStr) {
        if (lastActivity === yesterdayStr) {
            newStreak += 1;
        } else {
            newStreak = 1;
        }
    }

    const updatedUser = await pb.collection('users').update(user.id, { 
      xp: newXp,
      streak: newStreak,
      last_activity: now.toISOString()
    });

    const authData = JSON.parse(localStorage.getItem('pocketbase_auth') || '{}');
    authData.model = updatedUser;
    localStorage.setItem('pocketbase_auth', JSON.stringify(authData));

  } catch (error) {
    console.error(error);
  }
}