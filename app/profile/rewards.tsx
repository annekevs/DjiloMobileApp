import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trophy, Star, Gift, Flame, Target, Calendar, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const userStats = {
  totalPoints: 2450,
  level: 8,
  nextLevelPoints: 2800,
  streak: 12,
  totalWorkouts: 45,
  totalDays: 156,
};

const achievements = [
  {
    id: 1,
    title: 'Première séance',
    description: 'Complétez votre première séance d\'entraînement',
    icon: Trophy,
    color: '#F59E0B',
    points: 50,
    unlocked: true,
    unlockedDate: '2023-12-01',
  },
  {
    id: 2,
    title: 'Série de 7 jours',
    description: 'Entraînez-vous 7 jours consécutifs',
    icon: Flame,
    color: '#EF4444',
    points: 200,
    unlocked: true,
    unlockedDate: '2023-12-15',
  },
  {
    id: 3,
    title: 'Objectif atteint',
    description: 'Atteignez votre premier objectif',
    icon: Target,
    color: '#10B981',
    points: 150,
    unlocked: true,
    unlockedDate: '2024-01-10',
  },
  {
    id: 4,
    title: 'Membre actif',
    description: 'Complétez 50 séances d\'entraînement',
    icon: Star,
    color: '#8B5CF6',
    points: 500,
    unlocked: false,
    progress: 45,
    target: 50,
  },
  {
    id: 5,
    title: 'Série de 30 jours',
    description: 'Entraînez-vous 30 jours consécutifs',
    icon: Calendar,
    color: '#EC5300',
    points: 1000,
    unlocked: false,
    progress: 12,
    target: 30,
  },
  {
    id: 6,
    title: 'Mentor communautaire',
    description: 'Aidez 10 membres de la communauté',
    icon: Users,
    color: '#06B6D4',
    points: 300,
    unlocked: false,
    progress: 3,
    target: 10,
  },
];

const rewards = [
  {
    id: 1,
    title: 'Séance gratuite avec un coach',
    description: 'Session personnalisée de 60 minutes',
    points: 1000,
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: true,
  },
  {
    id: 2,
    title: 'Tapis de yoga premium',
    description: 'Tapis de yoga écologique haute qualité',
    points: 1500,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: true,
  },
  {
    id: 3,
    title: 'Abonnement premium 1 mois',
    description: 'Accès complet à tous les programmes',
    points: 2000,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: true,
  },
  {
    id: 4,
    title: 'Kit nutrition personnalisé',
    description: 'Plan alimentaire sur mesure',
    points: 2500,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: false,
  },
];

export default function RewardsScreen() {
  const [activeTab, setActiveTab] = useState('achievements');

  const handleBack = () => {
    router.back();
  };

  const handleClaimReward = (rewardId: number) => {
    console.log('Claiming reward:', rewardId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getLevelProgress = () => {
    const currentLevelPoints = userStats.totalPoints - (userStats.level - 1) * 350;
    const levelRange = 350;
    return (currentLevelPoints / levelRange) * 100;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Récompenses</Text>
        <View style={styles.headerRight} />
      </View>

      {/* User Stats */}
      <View style={styles.statsSection}>
        <LinearGradient
          colors={['#EC5300', '#FF6B35']}
          style={styles.statsCard}
        >
          <View style={styles.statsHeader}>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Niveau {userStats.level}</Text>
              <Text style={styles.pointsText}>{userStats.totalPoints} points</Text>
            </View>
            <View style={styles.levelBadge}>
              <Trophy size={24} color="#FFFFFF" />
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${getLevelProgress()}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>
              {userStats.nextLevelPoints - userStats.totalPoints} points pour le niveau {userStats.level + 1}
            </Text>
          </View>

          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Flame size={16} color="#FFFFFF" />
              <Text style={styles.quickStatText}>{userStats.streak} jours</Text>
            </View>
            <View style={styles.quickStat}>
              <Target size={16} color="#FFFFFF" />
              <Text style={styles.quickStatText}>{userStats.totalWorkouts} séances</Text>
            </View>
            <View style={styles.quickStat}>
              <Calendar size={16} color="#FFFFFF" />
              <Text style={styles.quickStatText}>{userStats.totalDays} jours</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text style={[styles.tabText, activeTab === 'achievements' && styles.tabTextActive]}>
            Succès
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'rewards' && styles.tabActive]}
          onPress={() => setActiveTab('rewards')}
        >
          <Text style={[styles.tabText, activeTab === 'rewards' && styles.tabTextActive]}>
            Boutique
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'achievements' ? (
          <View style={styles.achievementsSection}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.achievementCardUnlocked
                ]}
              >
                <View style={styles.achievementLeft}>
                  <View style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.unlocked ? achievement.color : '#F3F4F6' }
                  ]}>
                    <achievement.icon 
                      size={24} 
                      color={achievement.unlocked ? '#FFFFFF' : '#9CA3AF'} 
                    />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                    {achievement.unlocked ? (
                      <Text style={styles.achievementDate}>
                        Débloqué le {formatDate(achievement.unlockedDate!)}
                      </Text>
                    ) : (
                      <View style={styles.achievementProgress}>
                        <View style={styles.progressBarSmall}>
                          <View 
                            style={[
                              styles.progressFillSmall,
                              { 
                                width: `${getProgressPercentage(achievement.progress!, achievement.target!)}%`,
                                backgroundColor: achievement.color
                              }
                            ]} 
                          />
                        </View>
                        <Text style={styles.progressTextSmall}>
                          {achievement.progress}/{achievement.target}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.achievementRight}>
                  <Text style={[
                    styles.achievementPoints,
                    { color: achievement.unlocked ? achievement.color : '#9CA3AF' }
                  ]}>
                    +{achievement.points}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.rewardsSection}>
            {rewards.map((reward) => (
              <View key={reward.id} style={styles.rewardCard}>
                <Image source={{ uri: reward.image }} style={styles.rewardImage} />
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                  <View style={styles.rewardFooter}>
                    <View style={styles.rewardPoints}>
                      <Gift size={16} color="#EC5300" />
                      <Text style={styles.rewardPointsText}>{reward.points} points</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.claimButton,
                        (!reward.available || userStats.totalPoints < reward.points) && styles.claimButtonDisabled
                      ]}
                      onPress={() => handleClaimReward(reward.id)}
                      disabled={!reward.available || userStats.totalPoints < reward.points}
                    >
                      <Text style={[
                        styles.claimButtonText,
                        (!reward.available || userStats.totalPoints < reward.points) && styles.claimButtonTextDisabled
                      ]}>
                        {userStats.totalPoints < reward.points ? 'Insuffisant' : 'Échanger'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  statsSection: {
    padding: 20,
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pointsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    margin: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#EC5300',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementsSection: {
    paddingBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  achievementCardUnlocked: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  achievementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
  },
  achievementProgress: {
    gap: 4,
  },
  progressBarSmall: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: 2,
  },
  progressTextSmall: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  achievementRight: {
    alignItems: 'flex-end',
  },
  achievementPoints: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  rewardsSection: {
    paddingBottom: 20,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rewardImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  rewardContent: {
    padding: 16,
  },
  rewardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rewardPointsText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  claimButton: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  claimButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  claimButtonTextDisabled: {
    color: '#9CA3AF',
  },
});