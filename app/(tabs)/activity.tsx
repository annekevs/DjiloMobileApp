import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Trophy, Flame, Clock, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const weekData = [
  { day: 'L', completed: true, date: '15' },
  { day: 'M', completed: true, date: '16' },
  { day: 'M', completed: false, date: '17' },
  { day: 'J', completed: true, date: '18' },
  { day: 'V', completed: false, date: '19' },
  { day: 'S', completed: true, date: '20' },
  { day: 'D', completed: false, date: '21' },
];

const recentWorkouts = [
  {
    id: 1,
    name: 'HIIT Cardio',
    date: '18 Jan',
    duration: '30 min',
    calories: 280,
    completed: true,
  },
  {
    id: 2,
    name: 'Yoga Flow',
    date: '16 Jan',
    duration: '45 min',
    calories: 150,
    completed: true,
  },
  {
    id: 3,
    name: 'Force & Endurance',
    date: '15 Jan',
    duration: '60 min',
    calories: 420,
    completed: true,
  },
];

export default function ActivityScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Suivi d'activité</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#EC5300" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Trophy size={28} color="#FFFFFF" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Séances</Text>
            <Text style={styles.statPeriod}>cette semaine</Text>
          </LinearGradient>

          <View style={styles.statCard}>
            <Flame size={28} color="#EC5300" />
            <Text style={[styles.statNumber, { color: '#111827' }]}>2,450</Text>
            <Text style={[styles.statLabel, { color: '#6B7280' }]}>Calories</Text>
            <Text style={[styles.statPeriod, { color: '#9CA3AF' }]}>brûlées</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={28} color="#EC5300" />
            <Text style={[styles.statNumber, { color: '#111827' }]}>8h 30m</Text>
            <Text style={[styles.statLabel, { color: '#6B7280' }]}>Temps</Text>
            <Text style={[styles.statPeriod, { color: '#9CA3AF' }]}>d'exercice</Text>
          </View>

          <View style={styles.statCard}>
            <TrendingUp size={28} color="#10B981" />
            <Text style={[styles.statNumber, { color: '#111827' }]}>+15%</Text>
            <Text style={[styles.statLabel, { color: '#6B7280' }]}>Progression</Text>
            <Text style={[styles.statPeriod, { color: '#9CA3AF' }]}>vs. sem. passée</Text>
          </View>
        </View>

        {/* Weekly Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cette semaine</Text>
          <View style={styles.weekCalendar}>
            {weekData.map((day, index) => (
              <TouchableOpacity key={index} style={styles.dayContainer}>
                <Text style={styles.dayName}>{day.day}</Text>
                <View style={[
                  styles.dayCircle,
                  day.completed && styles.dayCompleted
                ]}>
                  {day.completed ? (
                    <CheckCircle size={16} color="#FFFFFF" fill="#FFFFFF" />
                  ) : (
                    <Text style={styles.dayDate}>{day.date}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Chart Placeholder */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progression</Text>
            <View style={styles.periodSelector}>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('week')}
              >
                <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>
                  Semaine
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
                onPress={() => setSelectedPeriod('month')}
              >
                <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>
                  Mois
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Graphique de progression</Text>
            <Text style={styles.chartSubtext}>Visualisation des performances</Text>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Séances récentes</Text>
          <View style={styles.workoutsList}>
            {recentWorkouts.map((workout) => (
              <TouchableOpacity key={workout.id} style={styles.workoutCard}>
                <View style={styles.workoutLeft}>
                  <View style={styles.workoutIcon}>
                    <CheckCircle size={20} color="#10B981" fill="#10B981" />
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutName}>{workout.name}</Text>
                    <Text style={styles.workoutDate}>{workout.date}</Text>
                  </View>
                </View>
                <View style={styles.workoutStats}>
                  <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  <Text style={styles.workoutCalories}>{workout.calories} cal</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objectifs du mois</Text>
          <View style={styles.goalsContainer}>
            <View style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>Séances complétées</Text>
                <Text style={styles.goalProgress}>15/20</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%' }]} />
              </View>
            </View>
            
            <View style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>Calories brûlées</Text>
                <Text style={styles.goalProgress}>4,200/6,000</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '70%' }]} />
              </View>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statPeriod: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  weekCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCompleted: {
    backgroundColor: '#EC5300',
  },
  dayDate: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#EC5300',
  },
  chartPlaceholder: {
    marginHorizontal: 20,
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  chartText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  workoutsList: {
    paddingHorizontal: 20,
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  workoutDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  workoutStats: {
    alignItems: 'flex-end',
  },
  workoutDuration: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EC5300',
    marginBottom: 2,
  },
  workoutCalories: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  goalsContainer: {
    paddingHorizontal: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  goalProgress: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#EC5300',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC5300',
    borderRadius: 4,
  },
});