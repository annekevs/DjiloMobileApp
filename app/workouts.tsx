import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, Filter, Clock, Flame, Target, Play } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 1, name: 'Tous', active: true },
  { id: 2, name: 'HIIT', active: false },
  { id: 3, name: 'Cardio', active: false },
  { id: 4, name: 'Force', active: false },
  { id: 5, name: 'Yoga', active: false },
  { id: 6, name: 'Pilates', active: false },
];

const allWorkouts = [
  {
    id: 1,
    title: 'HIIT Cardio Intensif',
    duration: '45 min',
    calories: 350,
    level: 'Intermédiaire',
    equipment: 'Aucun',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 8,
    category: 'HIIT',
    coach: 'Sarah Martin',
  },
  {
    id: 2,
    title: 'Cardio Dance Party',
    duration: '30 min',
    calories: 250,
    level: 'Débutant',
    equipment: 'Aucun',
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 6,
    category: 'Cardio',
    coach: 'Emma Dubois',
  },
  {
    id: 3,
    title: 'Force & Puissance',
    duration: '60 min',
    calories: 420,
    level: 'Avancé',
    equipment: 'Haltères',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 10,
    category: 'Force',
    coach: 'Marcus Johnson',
  },
  {
    id: 4,
    title: 'Yoga Flow Matinal',
    duration: '25 min',
    calories: 120,
    level: 'Débutant',
    equipment: 'Tapis',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 12,
    category: 'Yoga',
    coach: 'Lisa Chen',
  },
  {
    id: 5,
    title: 'Pilates Core',
    duration: '35 min',
    calories: 180,
    level: 'Intermédiaire',
    equipment: 'Tapis',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 8,
    category: 'Pilates',
    coach: 'Sophie Martin',
  },
  {
    id: 6,
    title: 'HIIT Express',
    duration: '15 min',
    calories: 150,
    level: 'Intermédiaire',
    equipment: 'Aucun',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 5,
    category: 'HIIT',
    coach: 'Alex Rodriguez',
  },
  {
    id: 7,
    title: 'Cardio Kickboxing',
    duration: '40 min',
    calories: 320,
    level: 'Intermédiaire',
    equipment: 'Aucun',
    image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 9,
    category: 'Cardio',
    coach: 'Maria Garcia',
  },
  {
    id: 8,
    title: 'Stretching & Mobilité',
    duration: '20 min',
    calories: 80,
    level: 'Débutant',
    equipment: 'Tapis',
    image: 'https://images.pexels.com/photos/4162452/pexels-photo-4162452.jpeg?auto=compress&cs=tinysrgb&w=400',
    exercises: 7,
    category: 'Yoga',
    coach: 'Marie Dubois',
  },
];

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);

  const handleBack = () => {
    router.back();
  };

  const handleWorkoutPress = (workout: any) => {
    router.push(`/workout/${workout.id}`);
  };

  const getFilteredWorkouts = () => {
    let filtered = allWorkouts;
    
    // Filter by category
    if (activeCategory !== 1) {
      const categoryName = categories.find(c => c.id === activeCategory)?.name;
      filtered = filtered.filter(w => w.category === categoryName);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(workout => 
        workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Toutes les séances</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#EC5300" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une séance..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workouts List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.workoutsList}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {getFilteredWorkouts().length} séances trouvées
          </Text>
        </View>
        
        <View style={styles.workoutsGrid}>
          {getFilteredWorkouts().map((workout) => (
            <TouchableOpacity
              key={workout.id}
              style={styles.workoutCard}
              onPress={() => handleWorkoutPress(workout)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: workout.image }} style={styles.workoutImage} />
                <View style={styles.playOverlay}>
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                </View>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{workout.duration}</Text>
                </View>
              </View>
              <View style={styles.workoutContent}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutCoach}>Par {workout.coach}</Text>
                <View style={styles.workoutStats}>
                  <View style={styles.stat}>
                    <Clock size={12} color="#9CA3AF" />
                    <Text style={styles.statText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Flame size={12} color="#9CA3AF" />
                    <Text style={styles.statText}>{workout.calories} cal</Text>
                  </View>
                  <View style={styles.stat}>
                    <Target size={12} color="#9CA3AF" />
                    <Text style={styles.statText}>{workout.exercises} ex</Text>
                  </View>
                </View>
                <View style={styles.workoutMeta}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{workout.level}</Text>
                  </View>
                  <Text style={styles.equipmentText}>{workout.equipment}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#EC5300',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  workoutsList: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  workoutsGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  workoutCard: {
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
  imageContainer: {
    position: 'relative',
  },
  workoutImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(236, 83, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  durationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  workoutContent: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  workoutCoach: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginBottom: 12,
  },
  workoutStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4F46E5',
  },
  equipmentText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});