import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Image as ImageIcon, Video, Hash, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const categories = [
  { id: 'motivation', name: 'Motivation', emoji: '💪' },
  { id: 'nutrition', name: 'Nutrition', emoji: '🥗' },
  { id: 'workout', name: 'Entraînement', emoji: '🏋️' },
  { id: 'progress', name: 'Progrès', emoji: '📈' },
  { id: 'tips', name: 'Conseils', emoji: '💡' },
  { id: 'lifestyle', name: 'Lifestyle', emoji: '🌟' },
];

export default function AddPostScreen() {
  const [postText, setPostText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handlePublish = () => {
    // Simulate post creation
    console.log('Publishing post:', {
      text: postText,
      category: selectedCategory,
      image: selectedImage,
      hashtags: hashtags,
      location: location,
    });
    router.back();
  };

  const handleAddPhoto = () => {
    // Simulate photo selection
    setSelectedImage('https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=500');
  };

  const handleRemovePhoto = () => {
    setSelectedImage(null);
  };

  const isPublishDisabled = !postText.trim() || !selectedCategory;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Nouveau post</Text>
        <TouchableOpacity 
          style={[styles.publishButton, isPublishDisabled && styles.publishButtonDisabled]}
          onPress={handlePublish}
          disabled={isPublishDisabled}
        >
          <Text style={[styles.publishButtonText, isPublishDisabled && styles.publishButtonTextDisabled]}>
            Publier
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* User Info */}
        <View style={styles.userSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100' }} 
            style={styles.userAvatar} 
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Marie Dupont</Text>
            <Text style={styles.userHandle}>@marie_fit</Text>
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postSection}>
          <TextInput
            style={styles.postInput}
            placeholder="Partagez votre expérience, vos conseils ou votre motivation..."
            value={postText}
            onChangeText={setPostText}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Selected Image */}
        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <TouchableOpacity style={styles.removeImageButton} onPress={handleRemovePhoto}>
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Media Options */}
        <View style={styles.mediaSection}>
          <TouchableOpacity style={styles.mediaButton} onPress={handleAddPhoto}>
            <ImageIcon size={20} color="#EC5300" />
            <Text style={styles.mediaButtonText}>Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton}>
            <Video size={20} color="#EC5300" />
            <Text style={styles.mediaButtonText}>Vidéo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton}>
            <Camera size={20} color="#EC5300" />
            <Text style={styles.mediaButtonText}>Caméra</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Catégorie</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hashtags */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Hash size={20} color="#EC5300" />
            <Text style={styles.inputLabel}>Hashtags</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="#fitness #motivation #transformation"
            value={hashtags}
            onChangeText={setHashtags}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Location */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <MapPin size={20} color="#EC5300" />
            <Text style={styles.inputLabel}>Lieu (optionnel)</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Ajouter un lieu..."
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Conseils pour un bon post</Text>
          <Text style={styles.tipsText}>
            • Partagez votre expérience personnelle{'\n'}
            • Utilisez des hashtags pertinents{'\n'}
            • Ajoutez une photo pour plus d'engagement{'\n'}
            • Soyez authentique et inspirant
          </Text>
        </View>
      </ScrollView>

      {/* Publish Button (Mobile) */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.publishButtonMobile, isPublishDisabled && styles.publishButtonMobileDisabled]}
          onPress={handlePublish}
          disabled={isPublishDisabled}
        >
          <LinearGradient
            colors={isPublishDisabled ? ['#9CA3AF', '#9CA3AF'] : ['#EC5300', '#FF6B35']}
            style={styles.publishButtonGradient}
          >
            <Text style={styles.publishButtonMobileText}>Publier mon post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  publishButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EC5300',
  },
  publishButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  publishButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  publishButtonTextDisabled: {
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  userHandle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  postSection: {
    paddingVertical: 20,
  },
  postInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    lineHeight: 24,
    minHeight: 120,
  },
  imagePreview: {
    position: 'relative',
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  mediaSection: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    gap: 20,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    gap: 6,
  },
  mediaButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  categoriesSection: {
    paddingVertical: 20,
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  categoryButtonSelected: {
    backgroundColor: '#EC5300',
    borderColor: '#EC5300',
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tipsSection: {
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 100,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
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
  publishButtonMobile: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  publishButtonMobileDisabled: {
    opacity: 0.6,
  },
  publishButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonMobileText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});