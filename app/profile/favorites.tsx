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
import { ArrowLeft, Heart, Clock, Users, Star, MapPin, Play } from 'lucide-react-native';
import { router } from 'expo-router';

const favoriteCategories = [
  { id: 'all', name: 'Tout', count: 12 },
  { id: 'programs', name: 'Programmes', count: 4 },
  { id: 'workouts', name: 'Séances', count: 5 },
  { id: 'gyms', name: 'Salles', count: 2 },
  { id: 'posts', name: 'Posts', count: 1 },
];

const favoriteItems = [
  {
    id: 1,
    type: 'program',
    title: 'Bootcamp Minceur',
    description: 'Programme intensif de 8 semaines',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '8 semaines',
    participants: 156,
    rating: 4.8,
    price: '39€/mois',
    isPaid: true,
  },
  {
    id: 2,
    type: 'workout',
    title: 'HIIT Cardio Intensif',
    description: 'Entraînement cardio haute intensité',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45 min',
    calories: 350,
    level: 'Intermédiaire',
  },
  {
    id: 3,
    type: 'gym',
    title: 'FitZone Center',
    description: 'Salle de sport moderne et complète',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
    distance: '0.8 km',
    rating: 4.6,
    price: '49€/mois',
  },
  {
    id: 4,
    type: 'program',
    title: 'Yoga Flow Matinal',
    description: 'Commencez votre journée en douceur',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '4 semaines',
    participants: 89,
    rating: 4.9,
    price: 'Gratuit',
    isPaid: false,
  },
  {
    id: 5,
    type: 'workout',
    title: 'Pilates Core',
    description: 'Renforcez votre centre',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '35 min',
    calories: 180,
    level: 'Intermédiaire',
  },
];

export default function FavoritesScreen() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleBack = () => {
    router.back();
  };

  const handleItemPress = (item: any) => {
    if (item.type === 'program') {
      router.push(`/program/${item.id}`);
    } else if (item.type === 'workout') {
      router.push(`/workout/${item.id}`);
    } else if (item.type === 'gym') {
      router.push(`/gym/${item.id}`);
    }
  };

  const handleRemoveFavorite = (itemId: number) => {
    console.log('Removing favorite:', itemId);
  };

  const getFilteredItems = () => {
    if (activeCategory === 'all') return favoriteItems;
    return favoriteItems.filter(item => {
      if (activeCategory === 'programs') return item.type === 'program';
      if (activeCategory === 'workouts') return item.type === 'workout';
      if (activeCategory === 'gyms') return item.type === 'gym';
      if (activeCategory === 'posts') return item.type === 'post';
      return true;
    });
  };

  const renderProgramCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.favoriteCard}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Heart size={20} color="#EC5300" fill="#EC5300" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardStats}>
          <View style={styles.stat}>
            <Clock size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.stat}>
            <Users size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{item.participants}</Text>
          </View>
          <View style={styles.stat}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View style={[styles.priceTag, !item.isPaid && styles.freeTag]}>
            <Text style={[styles.priceText, !item.isPaid && styles.freeText]}>
              {item.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWorkoutCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.favoriteCard}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.workoutImageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.playOverlay}>
          <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Heart size={20} color="#EC5300" fill="#EC5300" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardStats}>
          <View style={styles.stat}>
            <Clock size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <Text style={styles.statText}>•</Text>
          <Text style={styles.statText}>{item.calories} cal</Text>
          <Text style={styles.statText}>•</Text>
          <Text style={styles.statText}>{item.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGymCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.favoriteCard}
      onPress={() => handleItemPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Heart size={20} color="#EC5300" fill="#EC5300" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardStats}>
          <View style={styles.stat}>
            <MapPin size={14} color="#9CA3AF" />
            <Text style={styles.statText}>{item.distance}</Text>
          </View>
          <View style={styles.stat}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.gymPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCard = (item: any) => {
    if (item.type === 'program') return renderProgramCard(item);
    if (item.type === 'workout') return renderWorkoutCard(item);
    if (item.type === 'gym') return renderGymCard(item);
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Mes favoris</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {favoriteCategories.map((category) => (
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
              {category.name} ({category.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Favorites List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {getFilteredItems().length} favoris
          </Text>
        </View>

        <View style={styles.favoritesList}>
          {getFilteredItems().map(renderCard)}
        </View>

        {getFilteredItems().length === 0 && (
          <View style={styles.emptyState}>
            <Heart size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptySubtitle}>
              Ajoutez des programmes, séances ou salles à vos favoris pour les retrouver ici
            </Text>
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
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
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
  content: {
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
  favoritesList: {
    paddingHorizontal: 20,
  },
  favoriteCard: {
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
  cardImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  workoutImageContainer: {
    position: 'relative',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(236, 83, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  cardStats: {
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceTag: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeTag: {
    backgroundColor: '#10B981',
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  freeText: {
    color: '#FFFFFF',
  },
  gymPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});