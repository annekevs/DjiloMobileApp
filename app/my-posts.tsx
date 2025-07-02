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
import { ArrowLeft, Plus, Heart, MessageCircle, Share, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { router } from 'expo-router';

const myPosts = [
  {
    id: 1,
    content: 'Séance de HIIT terminée ! 💪 45 minutes d\'intensité pure. Je commence vraiment à voir les résultats après 3 semaines.',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 24,
    comments: 8,
    shares: 3,
    time: '2h',
    type: 'workout',
  },
  {
    id: 2,
    content: 'Ma recette post-workout préférée : smoothie banane-épinards-protéines 🥤 Parfait pour la récupération !',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500',
    likes: 18,
    comments: 12,
    shares: 6,
    time: '1j',
    type: 'nutrition',
  },
  {
    id: 3,
    content: 'Première semaine du programme Bootcamp terminée ! Difficile mais tellement motivant. Merci Coach Alexandre pour les encouragements 🙏',
    likes: 31,
    comments: 15,
    shares: 2,
    time: '3j',
    type: 'progress',
  },
  {
    id: 4,
    content: 'Conseil du jour : l\'hydratation est aussi importante que l\'entraînement ! 💧 N\'oubliez pas de boire régulièrement.',
    likes: 12,
    comments: 4,
    shares: 8,
    time: '5j',
    type: 'tip',
  },
];

export default function MyPostsScreen() {
  const [posts, setPosts] = useState(myPosts);

  const handleBack = () => {
    router.back();
  };

  const handleAddPost = () => {
    router.push('/add-post');
  };

  const handlePostPress = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleLike = (postId: number) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleComment = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleShare = (postId: number) => {
    console.log('Sharing post:', postId);
  };

  const handleMoreOptions = (postId: number) => {
    console.log('More options for post:', postId);
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return '#EC5300';
      case 'nutrition': return '#10B981';
      case 'progress': return '#3B82F6';
      case 'tip': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'workout': return 'Entraînement';
      case 'nutrition': return 'Nutrition';
      case 'progress': return 'Progrès';
      case 'tip': return 'Conseil';
      default: return 'Post';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Mes posts</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
          <Plus size={24} color="#EC5300" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{posts.length}</Text>
          <Text style={styles.statLabel}>Posts publiés</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {posts.reduce((sum, post) => sum + post.likes, 0)}
          </Text>
          <Text style={styles.statLabel}>J'aime reçus</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {posts.reduce((sum, post) => sum + post.comments, 0)}
          </Text>
          <Text style={styles.statLabel}>Commentaires</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.postCard}
            onPress={() => handlePostPress(post.id)}
          >
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.postInfo}>
                <View style={[styles.postTypeBadge, { backgroundColor: getPostTypeColor(post.type) }]}>
                  <Text style={styles.postTypeText}>{getPostTypeLabel(post.type)}</Text>
                </View>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => handleMoreOptions(post.id)}
              >
                <MoreHorizontal size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Image */}
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Heart size={18} color="#6B7280" />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleComment(post.id)}
              >
                <MessageCircle size={18} color="#6B7280" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(post.id)}
              >
                <Share size={18} color="#6B7280" />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {posts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Aucun post publié</Text>
            <Text style={styles.emptySubtitle}>
              Partagez votre première expérience avec la communauté
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleAddPost}>
              <Text style={styles.emptyButtonText}>Créer mon premier post</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
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
  statCard: {
    flex: 1,
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
  content: {
    flex: 1,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  postTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});