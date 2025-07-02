import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, Share, Plus, Search, Play, Utensils, Video } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Tout', icon: null, active: true },
  { id: 2, name: 'Vidéos', icon: Video, active: false },
  { id: 3, name: 'Nutrition', icon: Utensils, active: false },
  { id: 4, name: 'Conseils', icon: MessageCircle, active: false },
];

const posts = [
  {
    id: 1,
    user: {
      name: 'Sarah Martin',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: true,
    },
    content: 'Nouveau programme de HIIT disponible ! 🔥 Parfait pour brûler des calories rapidement. Qui est motivé pour essayer ?',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 42,
    comments: 8,
    time: '2h',
    type: 'post',
  },
  {
    id: 2,
    user: {
      name: 'Coach Alexandre',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: true,
    },
    content: 'Recette post-workout : Smoothie protéiné banane-épinards 🥤',
    description: 'Parfait pour la récupération musculaire après vos séances intensives.',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 67,
    comments: 15,
    time: '4h',
    type: 'nutrition',
  },
  {
    id: 3,
    user: {
      name: 'Emma Dubois',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: false,
    },
    content: 'Ma transformation après 3 mois de bootcamp ! Merci à toute l\'équipe 💪',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 124,
    comments: 23,
    time: '6h',
    type: 'post',
  },
  {
    id: 4,
    user: {
      name: 'Coach Lisa',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: true,
    },
    content: 'Tutoriel : Technique parfaite pour les squats',
    description: 'Évitez les erreurs communes avec ces conseils essentiels.',
    videoThumbnail: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 89,
    comments: 12,
    time: '8h',
    type: 'video',
  },
];

export default function CommunityScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredPosts = () => {
    let filteredPosts = posts;
    
    if (activeCategory === 2) filteredPosts = posts.filter(p => p.type === 'video');
    else if (activeCategory === 3) filteredPosts = posts.filter(p => p.type === 'nutrition');
    else if (activeCategory === 4) filteredPosts = posts.filter(p => p.type === 'post' && p.user.isCoach);
    
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filteredPosts;
  };

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.isCoach && (
              <View style={styles.coachBadge}>
                <Text style={styles.coachText}>Coach</Text>
              </View>
            )}
          </View>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postContent}>{post.content}</Text>
      {post.description && (
        <Text style={styles.postDescription}>{post.description}</Text>
      )}

      {/* Post Media */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      {post.videoThumbnail && (
        <View style={styles.videoContainer}>
          <Image source={{ uri: post.videoThumbnail }} style={styles.postImage} />
          <View style={styles.playButton}>
            <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
          </View>
        </View>
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={20} color="#6B7280" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={20} color="#6B7280" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share size={20} color="#6B7280" />
          <Text style={styles.actionText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Communauté</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher dans la communauté..."
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
            {category.icon && (
              <category.icon 
                size={16} 
                color={activeCategory === category.id ? '#FFFFFF' : '#6B7280'} 
              />
            )}
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.categoryTextActive,
                category.icon && styles.categoryTextWithIcon
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts Feed */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
      >
        {getFilteredPosts().map(renderPost)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EC5300',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  categoryTextWithIcon: {
    marginLeft: 6,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingVertical: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginRight: 8,
  },
  coachBadge: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  coachText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  videoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
});