import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronRight, Play, Star, Clock, Users, MapPin, Flame } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const todayWorkout = {
  id: 1,
  title: 'HIIT Cardio Intensif',
  coach: 'Sarah Martin',
  time: '14:30 - 15:15',
  duration: '45 min',
  calories: 350,
  level: 'Intermédiaire',
  image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=500',
};

const featuredPrograms = [
  {
    id: 1,
    title: 'Bootcamp Minceur',
    description: 'Programme intensif pour perdre du poids rapidement',
    duration: '8 semaines',
    participants: 156,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: true,
    price: '39€/mois',
    coach: 'Coach Alexandre',
    level: 'Intermédiaire',
  },
  {
    id: 2,
    title: 'Yoga Flow Matinal',
    description: 'Commencez votre journée en douceur avec le yoga',
    duration: '4 semaines',
    participants: 89,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: false,
    price: 'Gratuit',
    coach: 'Coach Lisa',
    level: 'Débutant',
  },
  {
    id: 3,
    title: 'Force & Puissance',
    description: 'Développez votre force avec des exercices ciblés',
    duration: '6 semaines',
    participants: 124,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: true,
    price: '29€/mois',
    coach: 'Coach Marcus',
    level: 'Avancé',
  },
];

const quickWorkouts = [
  {
    id: 1,
    title: 'HIIT Express',
    duration: '15 min',
    calories: 150,
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=300',
    exercises: 8,
    level: 'Intermédiaire',
    equipment: 'Aucun',
  },
  {
    id: 2,
    title: 'Cardio Dance',
    duration: '20 min',
    calories: 200,
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=300',
    exercises: 6,
    level: 'Débutant',
    equipment: 'Aucun',
  },
  {
    id: 3,
    title: 'Abs Killer',
    duration: '10 min',
    calories: 80,
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=300',
    exercises: 5,
    level: 'Intermédiaire',
    equipment: 'Tapis',
  },
];

const nearbyGyms = [
  {
    id: 1,
    name: 'FitZone Center',
    address: '15 rue de la Paix, Paris',
    distance: '0.8 km',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
    openHours: '6h-23h',
    price: '49€/mois',
    amenities: ['Piscine', 'Sauna', 'Parking'],
  },
  {
    id: 2,
    name: 'Urban Fitness',
    address: '42 avenue des Sports',
    distance: '1.2 km',
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
    openHours: '7h-22h',
    price: '39€/mois',
    amenities: ['CrossFit', 'Cours collectifs'],
  },
];

export default function HomeScreen() {
  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleTodayWorkout = () => {
    router.push(`/workout/${todayWorkout.id}`);
  };

  const handleProgramPress = (program: any) => {
    router.push(`/program/${program.id}`);
  };

  const handleWorkoutPress = (workout: any) => {
    router.push(`/workout/${workout.id}`);
  };

  const handleGymPress = (gym: any) => {
    router.push(`/gym/${gym.id}`);
  };

  const handleSeeAllPrograms = () => {
    router.push('/programs');
  };

  const handleSeeAllWorkouts = () => {
    router.push('/workouts');
  };

  const handleSeeAllGyms = () => {
    router.push('/gyms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour Marie!</Text>
            <Text style={styles.subtitle}>Prête pour votre séance?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleNotifications}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Workout Card */}
        <TouchableOpacity onPress={handleTodayWorkout}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.todayCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.todayContent}>
              <View style={styles.todayLeft}>
                <Text style={styles.todayTitle}>Séance du jour</Text>
                <Text style={styles.todayProgram}>{todayWorkout.title}</Text>
                <Text style={styles.todayTime}>{todayWorkout.time}</Text>
                <View style={styles.todayStats}>
                  <View style={styles.todayStat}>
                    <Clock size={14} color="#FFFFFF" />
                    <Text style={styles.todayStatText}>{todayWorkout.duration}</Text>
                  </View>
                  <View style={styles.todayStat}>
                    <Flame size={14} color="#FFFFFF" />
                    <Text style={styles.todayStatText}>{todayWorkout.calories} cal</Text>
                  </View>
                </View>
              </View>
              <View style={styles.todayRight}>
                <Image source={{ uri: todayWorkout.image }} style={styles.todayImage} />
                <View style={styles.playButton}>
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Séances cette semaine</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1,250</Text>
            <Text style={styles.statLabel}>Calories brûlées</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3h 45m</Text>
            <Text style={styles.statLabel}>Temps total</Text>
          </View>
        </View>

        {/* Featured Programs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Programmes populaires</Text>
            <TouchableOpacity onPress={handleSeeAllPrograms}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredPrograms.map((program) => (
              <TouchableOpacity 
                key={program.id} 
                style={styles.programCard}
                onPress={() => handleProgramPress(program)}
              >
                <Image source={{ uri: program.image }} style={styles.programImage} />
                <View style={styles.programContent}>
                  <View style={styles.programHeader}>
                    <Text style={styles.programTitle}>{program.title}</Text>
                    <View style={[styles.priceTag, program.isPaid && styles.paidTag]}>
                      <Text style={[styles.priceText, program.isPaid && styles.paidText]}>
                        {program.price}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.programDescription}>{program.description}</Text>
                  <View style={styles.programStats}>
                    <View style={styles.stat}>
                      <Clock size={14} color="#9CA3AF" />
                      <Text style={styles.statText}>{program.duration}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Users size={14} color="#9CA3AF" />
                      <Text style={styles.statText}>{program.participants}</Text>
                    </View>
                    <View style={styles.stat}>
                      <Star size={14} color="#FCD34D" fill="#FCD34D" />
                      <Text style={styles.statText}>{program.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Séances rapides</Text>
            <TouchableOpacity onPress={handleSeeAllWorkouts}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickWorkouts}>
            {quickWorkouts.map((workout) => (
              <TouchableOpacity 
                key={workout.id} 
                style={styles.quickWorkoutCard}
                onPress={() => handleWorkoutPress(workout)}
              >
                <Image source={{ uri: workout.image }} style={styles.quickWorkoutImage} />
                <View style={styles.quickWorkoutContent}>
                  <Text style={styles.quickWorkoutTitle}>{workout.title}</Text>
                  <View style={styles.quickWorkoutStats}>
                    <Text style={styles.quickWorkoutStat}>{workout.duration}</Text>
                    <Text style={styles.quickWorkoutStat}>•</Text>
                    <Text style={styles.quickWorkoutStat}>{workout.calories} cal</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Gyms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Salles à proximité</Text>
            <TouchableOpacity onPress={handleSeeAllGyms}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nearbyGyms.map((gym) => (
              <TouchableOpacity 
                key={gym.id} 
                style={styles.gymCard}
                onPress={() => handleGymPress(gym)}
              >
                <Image source={{ uri: gym.image }} style={styles.gymImage} />
                <View style={styles.gymContent}>
                  <Text style={styles.gymName}>{gym.name}</Text>
                  <View style={styles.gymMeta}>
                    <MapPin size={12} color="#9CA3AF" />
                    <Text style={styles.gymDistance}>{gym.distance}</Text>
                    <Star size={12} color="#FCD34D" fill="#FCD34D" />
                    <Text style={styles.gymRating}>{gym.rating}</Text>
                  </View>
                  <Text style={styles.gymPrice}>{gym.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EC5300',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  todayCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
  },
  todayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayLeft: {
    flex: 1,
    marginRight: 16,
  },
  todayTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  todayProgram: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  todayTime: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  todayStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  todayStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  todayRight: {
    position: 'relative',
  },
  todayImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
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
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  programCard: {
    width: width * 0.8,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  programImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  programContent: {
    padding: 16,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  priceTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidTag: {
    backgroundColor: '#EC5300',
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  paidText: {
    color: '#FFFFFF',
  },
  programDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  programStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginLeft: 4,
  },
  quickWorkouts: {
    paddingHorizontal: 20,
  },
  quickWorkoutCard: {
    flexDirection: 'row',
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
  quickWorkoutImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  quickWorkoutContent: {
    flex: 1,
  },
  quickWorkoutTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  quickWorkoutStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickWorkoutStat: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginRight: 8,
  },
  gymCard: {
    width: width * 0.6,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gymImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  gymContent: {
    padding: 16,
  },
  gymName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  gymMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gymDistance: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginLeft: 4,
    marginRight: 12,
  },
  gymRating: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginLeft: 4,
  },
  gymPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
});