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
import { ArrowLeft, Search, Filter, Clock, Users, Star, Play } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 1, name: 'Tous', active: true },
  { id: 2, name: 'Gratuit', active: false },
  { id: 3, name: 'Premium', active: false },
  { id: 4, name: 'Débutant', active: false },
  { id: 5, name: 'Intermédiaire', active: false },
  { id: 6, name: 'Avancé', active: false },
];

const allPrograms = [
  {
    id: 1,
    title: 'Bootcamp Minceur',
    description: 'Programme intensif de 8 semaines pour une perte de poids rapide',
    duration: '8 semaines',
    participants: 156,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: true,
    price: '39€/mois',
    coach: 'Coach Alexandre',
    level: 'Intermédiaire',
    category: 'Premium',
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
    category: 'Gratuit',
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
    category: 'Premium',
  },
  {
    id: 4,
    title: 'Cardio Dance',
    description: 'Brûlez des calories en dansant sur vos musiques préférées',
    duration: '3 semaines',
    participants: 203,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: false,
    price: 'Gratuit',
    coach: 'Coach Emma',
    level: 'Débutant',
    category: 'Gratuit',
  },
  {
    id: 5,
    title: 'Pilates Core',
    description: 'Renforcez votre centre et améliorez votre posture',
    duration: '5 semaines',
    participants: 78,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: true,
    price: '25€/mois',
    coach: 'Coach Sophie',
    level: 'Intermédiaire',
    category: 'Premium',
  },
  {
    id: 6,
    title: 'Stretching & Mobilité',
    description: 'Améliorez votre flexibilité et prévenez les blessures',
    duration: '2 semaines',
    participants: 145,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=500',
    isPaid: false,
    price: 'Gratuit',
    coach: 'Coach Marie',
    level: 'Débutant',
    category: 'Gratuit',
  },
];

export default function ProgramsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);

  const handleBack = () => {
    router.back();
  };

  const handleProgramPress = (program: any) => {
    router.push(`/program/${program.id}`);
  };

  const getFilteredPrograms = () => {
    let filtered = allPrograms;
    
    // Filter by category
    if (activeCategory !== 1) {
      const categoryName = categories.find(c => c.id === activeCategory)?.name;
      if (categoryName === 'Gratuit') {
        filtered = filtered.filter(p => !p.isPaid);
      } else if (categoryName === 'Premium') {
        filtered = filtered.filter(p => p.isPaid);
      } else if (['Débutant', 'Intermédiaire', 'Avancé'].includes(categoryName || '')) {
        filtered = filtered.filter(p => p.level === categoryName);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(program => 
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.coach.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Text style={styles.title}>Tous les programmes</Text>
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
            placeholder="Rechercher un programme..."
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

      {/* Programs List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.programsList}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {getFilteredPrograms().length} programmes trouvés
          </Text>
        </View>
        
        {getFilteredPrograms().map((program) => (
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
              <Text style={styles.programCoach}>Par {program.coach}</Text>
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
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{program.level}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Play size={16} color="#EC5300" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  programsList: {
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
  programCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
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
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  programContent: {
    flex: 1,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  programTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  priceTag: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  paidTag: {
    backgroundColor: '#EC5300',
  },
  priceText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  paidText: {
    color: '#FFFFFF',
  },
  programDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 16,
  },
  programCoach: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginBottom: 8,
  },
  programStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginLeft: 3,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  levelText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#4F46E5',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});