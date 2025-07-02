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
import { ArrowLeft, Heart, MessageCircle, Share, Send, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const postData = {
  1: {
    id: 1,
    user: {
      name: 'Sarah Martin',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200',
      isCoach: true,
      verified: true,
    },
    content: 'Nouveau programme de HIIT disponible ! 🔥 Parfait pour brûler des calories rapidement. Qui est motivé pour essayer ?',
    image: 'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 42,
    comments: 8,
    shares: 3,
    time: '2h',
    isLiked: false,
    tags: ['#HIIT', '#Fitness', '#Motivation'],
  },
};

const commentsData = [
  {
    id: 1,
    user: {
      name: 'Marie Dubois',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: false,
    },
    content: 'Super motivant ! J\'ai hâte d\'essayer ce programme 💪',
    time: '1h',
    likes: 5,
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: 'Coach Alexandre',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: true,
    },
    content: 'Excellent programme Sarah ! Je le recommande vivement à mes clients.',
    time: '45 min',
    likes: 12,
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: 'Emma Laurent',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: false,
    },
    content: 'Combien de fois par semaine conseillez-vous de faire ce programme ?',
    time: '30 min',
    likes: 2,
    isLiked: false,
  },
  {
    id: 4,
    user: {
      name: 'Thomas Petit',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      isCoach: false,
    },
    content: 'J\'ai commencé hier, déjà en sueur après 10 minutes ! 😅',
    time: '15 min',
    likes: 8,
    isLiked: false,
  },
];

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(postData[id as string] || postData[1]);
  const [comments, setComments] = useState(commentsData);
  const [newComment, setNewComment] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleCommentLike = (commentId: number) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleShare = () => {
    console.log('Sharing post:', post.id);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          name: 'Marie Dupont',
          avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
          isCoach: false,
        },
        content: newComment,
        time: 'maintenant',
        likes: 0,
        isLiked: false,
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
      setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Publication</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Post */}
        <View style={styles.postCard}>
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
                {post.user.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>

          {/* Post Content */}
          <Text style={styles.postContent}>{post.content}</Text>
          
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Post Image */}
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          {/* Post Stats */}
          <View style={styles.postStats}>
            <Text style={styles.statsText}>{post.likes} j'aime</Text>
            <Text style={styles.statsText}>{post.comments} commentaires</Text>
            <Text style={styles.statsText}>{post.shares} partages</Text>
          </View>

          {/* Post Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity 
              style={[styles.actionButton, post.isLiked && styles.actionButtonLiked]} 
              onPress={handleLike}
            >
              <Heart 
                size={20} 
                color={post.isLiked ? "#EC5300" : "#6B7280"} 
                fill={post.isLiked ? "#EC5300" : "transparent"}
              />
              <Text style={[styles.actionText, post.isLiked && styles.actionTextLiked]}>
                J'aime
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color="#6B7280" />
              <Text style={styles.actionText}>Commenter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share size={20} color="#6B7280" />
              <Text style={styles.actionText}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Commentaires ({comments.length})</Text>
          
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentBubble}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUserName}>{comment.user.name}</Text>
                    {comment.user.isCoach && (
                      <View style={styles.commentCoachBadge}>
                        <Text style={styles.commentCoachText}>Coach</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
                <View style={styles.commentActions}>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                  <TouchableOpacity 
                    style={styles.commentLikeButton}
                    onPress={() => handleCommentLike(comment.id)}
                  >
                    <Text style={[
                      styles.commentLikeText,
                      comment.isLiked && styles.commentLikeTextActive
                    ]}>
                      J'aime
                    </Text>
                  </TouchableOpacity>
                  {comment.likes > 0 && (
                    <Text style={styles.commentLikes}>{comment.likes} j'aime</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100' }} 
          style={styles.inputAvatar} 
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Écrivez un commentaire..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity 
            style={[styles.sendButton, newComment.trim() && styles.sendButtonActive]}
            onPress={handleSendComment}
            disabled={!newComment.trim()}
          >
            <Send size={16} color={newComment.trim() ? "#FFFFFF" : "#9CA3AF"} />
          </TouchableOpacity>
        </View>
      </View>
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
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    padding: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginRight: 8,
  },
  coachBadge: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  coachText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    backgroundColor: '#10B981',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
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
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#FEF3E7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonLiked: {
    backgroundColor: '#FEF3E7',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  actionTextLiked: {
    color: '#EC5300',
  },
  commentsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  commentsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  commentCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
    marginBottom: 6,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUserName: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginRight: 6,
  },
  commentCoachBadge: {
    backgroundColor: '#EC5300',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  commentCoachText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  commentTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginRight: 16,
  },
  commentLikeButton: {
    marginRight: 16,
  },
  commentLikeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  commentLikeTextActive: {
    color: '#EC5300',
  },
  commentLikes: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  inputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#EC5300',
  },
});