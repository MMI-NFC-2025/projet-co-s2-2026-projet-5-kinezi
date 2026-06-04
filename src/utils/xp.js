import PocketBase from 'pocketbase';

export async function addXp(xpReward) {
  const pb = new PocketBase('http://pbopensigne.lilian-maitre.fr');
  
  if (!pb.authStore.isValid || !pb.authStore.model) return;

  const user = pb.authStore.model;

  try {
    // 1. Récupération des données fraîches
    const freshUser = await pb.collection('users').getOne(user.id);
    
    // 2. Ajout de l'XP
    const newXp = (freshUser.xp || 0) + xpReward;

    // 3. Calcul du STREAK (La flamme)
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const lastActivity = freshUser.last_activity ? freshUser.last_activity.split(' ')[0] : null;

    let newStreak = freshUser.streak || 0;

    // S'il n'a pas encore joué aujourd'hui
    if (lastActivity !== todayStr) {
        if (lastActivity === yesterdayStr) {
            // S'il a joué hier, la flamme augmente
            newStreak += 1;
        } else {
            // S'il a raté hier, la flamme retombe à 1
            newStreak = 1;
        }
    }

    // 4. Enregistrement en base de données
    const updatedUser = await pb.collection('users').update(user.id, { 
      xp: newXp,
      streak: newStreak,
      last_activity: now.toISOString()
    });

    // 5. Mise à jour de la mémoire du navigateur
    const authData = JSON.parse(localStorage.getItem('pocketbase_auth') || '{}');
    authData.model = updatedUser;
    localStorage.setItem('pocketbase_auth', JSON.stringify(authData));

  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'XP/Streak :", error);
  }
}