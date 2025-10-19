<script setup>
import { ref } from 'vue';

// определяем props: входные параметры, которые приходят от родителя
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

// опеделяем emit события, которые компонент может отправлять наружу
const emit = defineEmits(['liked']);

//реактивная переменная для состояния "лайкнуто" (true/false)
const isLiked = ref(false);

//функция, которая вызывается при клике на кнопку "like"
const handleLike = () => {
  isLiked.value = !isLiked.value;
  emit('liked');
};

// функция форматирования количества просмотров:
const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
};
</script>


<template>
  <div class="video-card">
    <img :src="thumbnail" :alt="title" class="thumbnail" />
    <div class="video-info">
      <h3 class="title">{{ title }}</h3>
      <p class="channel">{{ channel }}</p>
      <div class="footer">
        <span class="views">{{ formatViews(views) }} views</span>
        <button @click="handleLike" :class="['like-button', { liked: isLiked }]">
          <span class="heart">{{ isLiked ? '❤️' : '' }}</span>
          Like
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.video-info {
  padding: 12px;
}

.title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
}

.channel {
  color: #606060;
  font-size: 12px;
  margin-bottom: 8px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.views {
  color: #606060;
  font-size: 12px;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: #f2f2f2;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  font-size: 12px;
}

.like-button.liked {
  background: #ff0000;
  color: white;
}
</style>