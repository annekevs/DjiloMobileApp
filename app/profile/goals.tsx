import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Target, TrendingUp, Calendar, CircleCheck as CheckCircle, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const currentGoals = [
  {
    id: 1,
    title: 'Perdre 5kg',
    category: 'Poids',
    target: 5,
    current: 2.3,
    unit: 'kg',
    deadline: '2024-03-01',
    progress: 46,
    color: '#EC5300',
  },
  {
    id: 2,
    title: '20 séances par mois',
    category: 'Activité',
    target: 20,
    current: 12,
    unit: 'séances',
    deadline: '2024-01-31',
    progress: 60,
    color: '#10B981',
  },
  {
    id: 3,
    title: 'Courir 5km sans pause',
    category: 'Endurance',
    target: 5,
    current: 3.2,
    unit: 'km',
    deadline: '2024-02-15',
    progress: 64,
    color: '#3B82F6',
  },
];

const completedGoals = [
  {
    id: 4,
    title: 'Faire 10 pompes',
    category: 'Force',
    completedDate: '2024-01-10',
    color: '#F59E0B',
  },
  {
    id: 5,
    title: '15 séances en décembre',
    category: 'Activité',
    completedDate: '2023-12-31',
    color: '#10B981',
  },
];

const goalCategories = [
  { id: 'weight', name: 'Poids', icon: Target, color: '#EC5300' },
  { id: 'activity', name: 'Activité', icon: TrendingUp, color: '#10B981' },
  { id: 'endurance', name: 'Endurance', icon: Calendar, color: '#3B82F6' },
  { id: 'strength', name: 'Force', icon: CheckCircle, color: '#F59E0B' },
];

export default function GoalsScreen() {
  const [activeTab, setActiveTab] = useState('current');

  const handleBack = () => {
    router.back();
  };

  const handleAddGoal = () => {
    router.push('/profile/add-goal');
  };

  const handleEditGoal = (goalId: number) => {
    router.push(`/profile/edit-goal/${goalId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Mes objectifs</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Plus size={24} color="#EC5300" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'current' && styles.tabActive]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.tabTextActive]}>
            En cours ({currentGoals.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Terminés ({completedGoals.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'current' ? (
          <>
            {/* Current Goals */}
            <View style={styles.goalsSection}>
              {currentGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={styles.goalCard}
                  onPress={() => handleEditGoal(goal.id)}
                >
                  <View style={styles.goalHeader}>
                    <View style={styles.goalInfo}>
                      <Text style={styles.goalTitle}>{goal.title}</Text>
                      <Text style={styles.goalCategory}>{goal.category}</Text>
                    </View>
                    <View style={[styles.goalProgress, { borderColor: goal.color }]}>
                      <Text style={[styles.goalProgressText, { color: goal.color }]}>
                        {goal.progress}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.goalStats}>
                    <Text style={styles.goalCurrent}>
                      {goal.current} / {goal.target} {goal.unit}
                    </Text>
                    <Text style={styles.goalDeadline}>
                      {getDaysRemaining(goal.deadline)} jours restants
                    </Text>
                  </View>

                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${goal.progress}%`, backgroundColor: goal.color }
                      ]} 
                    />
                  </View>

                  <Text style={styles.goalDate}>
                    Objectif : {formatDate(goal.deadline)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Add Goals */}
            <View style={styles.quickAddSection}>
              <Text style={styles.sectionTitle}>Objectifs populaires</Text>
              <View style={styles.categoriesGrid}>
                {goalCategories.map((category) => (
                  <TouchableOpacity key={category.id} style={styles.categoryCard}>
                    <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                      <category.icon size={24} color={category.color} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Completed Goals */}
            <View style={styles.goalsSection}>
              {completedGoals.map((goal) => (
                <View key={goal.id} style={styles.completedGoalCard}>
                  <View style={styles.completedGoalHeader}>
                    <CheckCircle size={24} color="#10B981" />
                    <View style={styles.completedGoalInfo}>
                      <Text style={styles.completedGoalTitle}>{goal.title}</Text>
                      <Text style={styles.completedGoalCategory}>{goal.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.completedGoalDate}>
                    Terminé le {formatDate(goal.completedDate)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Achievement Stats */}
            <View style={styles.achievementStats}>
              <Text style={styles.sectionTitle}>Statistiques</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{completedGoals.length}</Text>
                  <Text style={styles.statLabel}>Objectifs atteints</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{currentGoals.length}</Text>
                  <Text style={styles.statLabel}>En cours</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>
                    {Math.round(currentGoals.reduce((acc, goal) => acc + goal.progress, 0) / currentGoals.length)}%
                  </Text>
                  <Text style={styles.statLabel}>Progression moy.</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Add Goal Button */}
      {activeTab === 'current' && (
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.addGoalButton} onPress={handleAddGoal}>
            <LinearGradient
              colors={['#EC5300', '#FF6B35']}
              style={styles.addGoalButtonGradient}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addGoalButtonText}>Ajouter un objectif</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
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
  goalsSection: {
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  goalCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  goalProgress: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalProgressText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalCurrent: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  goalDeadline: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  completedGoalCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  completedGoalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedGoalInfo: {
    marginLeft: 12,
    flex: 1,
  },
  completedGoalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  completedGoalCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  completedGoalDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#059669',
  },
  quickAddSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  achievementStats: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  addGoalButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addGoalButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  addGoalButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});