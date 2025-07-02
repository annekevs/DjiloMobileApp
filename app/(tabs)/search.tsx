import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Clock, Users, Dumbbell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Tout', active: true },
  { id: 2, name: 'Programmes', active: false },
  { id: 3, name: 'Salles', active: false },
  { id: 4, name: 'Équipement', active: false },
];

const programs = [
  {
    id: 1,
    title: 'Bootcamp Minceur',
    type: 'Programme',
    duration: '8 semaines',
    level: 'Intermédiaire',
    rating: 4.8,
    price: '39€/mois',
    isPaid: true,
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: 156,
  },
  {
    id: 2,
    title: 'Yoga Débutant',
    type: 'Programme',
    duration: '4 semaines',
    level: 'Débutant',
    rating: 4.9,
    price: 'Gratuit',
    isPaid: false,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: 89,
  },
];

const gyms = [
  {
    id: 1,
    name: 'FitZone Center',
    type: 'Salle',
    address: '15 rue de la Paix, Paris',
    distance: '0.8 km',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
    openHours: '6h-23h',
  },
  {
    id: 2,
    name: 'Urban Fitness',
    type: 'Salle',
    address: '42 avenue des Sports',
    distance: '1.2 km',
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
    openHours: '7h-22h',
  },
];

const equipment = [
  {
    id: 1,
    name: 'Haltères ajustables',
    type: 'Équipement',
    category: 'Musculation',
    price: '89€',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Tapis de yoga premium',
    type: 'Équipement',
    category: 'Yoga',
    price: '45€',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);

  const allItems = [...programs, ...gyms, ...equipment];

  const getFilteredItems = () => {
    let items = allItems;
    
    if (activeCategory === 2) items = programs;
    else if (activeCategory === 3) items = gyms;
    else if (activeCategory === 4) items = equipment;
    
    if (searchQuery) {
      items = items.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  const renderProgramCard = (program: any) => (
    <TouchableOpacity key={program.id} style={styles.card}>
      <Image source={{ uri: program.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{program.title}</Text>
          <View style={[styles.priceTag, !program.isPaid && styles.freeTag]}>
            <Text style={[styles.priceText, !program.isPaid && styles.freeText]}>
              {program.price}
            </Text>
          </View>
        </View>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{program.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.metaText}>{program.participants}</Text>
          </View>
          <View style={styles.metaItem}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.metaText}>{program.rating}</Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{program.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGymCard = (gym: any) => (
    <TouchableOpacity key={gym.id} style={styles.card}>
      <Image source={{ uri: gym.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{gym.name}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.metaText}>{gym.distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{gym.openHours}</Text>
          </View>
          <View style={styles.metaItem}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.metaText}>{gym.rating}</Text>
          </View>
        </View>
        <Text style={styles.gymAddress}>{gym.address}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEquipmentCard = (equipment: any) => (
    <TouchableOpacity key={equipment.id} style={styles.card}>
      <Image source={{ uri: equipment.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{equipment.name}</Text>
          <Text style={styles.equipmentPrice}>{equipment.price}</Text>
        </View>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Dumbbell size={14} color="#6B7280" />
            <Text style={styles.metaText}>{equipment.category}</Text>
          </View>
          <View style={styles.metaItem}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <Text style={styles.metaText}>{equipment.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCard = (item: any) => {
    if (item.type === 'Programme') return renderProgramCard(item);
    if (item.type === 'Salle') return renderGymCard(item);
    if (item.type === 'Équipement') return renderEquipmentCard(item);
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Recherche</Text>
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
            placeholder="Rechercher programmes, salles..."
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

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.results}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {getFilteredItems().length} résultats trouvés
          </Text>
        </View>
        
        <View style={styles.cardGrid}>
          {getFilteredItems().map(renderCard)}
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
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
  results: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  cardGrid: {
    paddingHorizontal: 20,
  },
  card: {
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
    marginRight: 8,
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
  equipmentPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  levelBadge: {
    alignSelf: 'flex-start',
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
  gymAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});