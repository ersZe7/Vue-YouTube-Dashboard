<script setup>
import { ref, watch } from 'vue';
import VideoCard from './components/VideoCard.vue';
import { useVideos } from './composables/videos';

const { videos, loading, filteredVideos, searchQuery, sortByViews, toggleSort } = useVideos();

const totalLikes = ref(0);
const darkMode = ref(false);

//обработчик лайка от дочерних карточек
const handleLike = () => {
  totalLikes.value++;
};

//переключение темы
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};

// наблюдаем за строкой поиска
watch(searchQuery, (newValue) => {
  if (newValue) {
    console.log(`Search query changed to: "${newValue}"`);
  }
});
</script>


<template>
  <div :class="['app', { 'dark-mode': darkMode }]">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1>YouTube</h1>

        <!-- поиск в хедере -->
        <div class="search-box">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="search-input"
          />
        </div>

        <!-- кнопка сортировки: визуально активна, если sortByViews = true -->
        <div class="header-actions">
          <button @click="toggleSort" :class="['sort-button', { active: sortByViews }]">
            Sort
          </button>

          <div class="likes-counter">
            ❤️ {{ totalLikes }}
          </div>

          <button @click="toggleTheme" class="theme-toggle">
            {{ darkMode ? '☀️' : '🌙' }}
          </button>

        </div>
      </header>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading videos...</p>
      </div>

      <!-- Main Content -->
      <div v-else>

        <!-- Results Counter -->
        <p class="results-counter">
          Found {{ filteredVideos.length }} video{{ filteredVideos.length !== 1 ? 's' : '' }}
        </p>

        <!-- Video Grid -->
        <div v-if="filteredVideos.length === 0" class="no-videos">
          <p>No videos found.</p>
        </div>
        <div v-else class="video-grid">
          <VideoCard
              v-for="video in filteredVideos"
              :key="video.id"
              :title="video.title"
              :channel="video.channel"
              :views="video.views"
              :thumbnail="video.thumbnail"
              @liked="handleLike"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
  transition: background-color 0.3s;
}

.app.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
  white-space: nowrap;
}

.header .search-box {
  flex: 1;
  max-width: 600px;
}

.header .search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 24px;
  font-size: 1rem;
  transition: all 0.3s;
}

.header .search-input:focus {
  outline: none;
  border-color: #065fd4;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
}

.dark-mode .header .search-input {
  background: #121212;
  border-color: #303030;
  color: white;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.likes-counter {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 18px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

.dark-mode .likes-counter {
  background: #2d2d2d;
  color: white;
}

.theme-toggle {
  background: white;
  border: none;
  padding: 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.dark-mode .theme-toggle {
  background: #2d2d2d;
}

.loading {
  text-align: center;
  padding: 4rem;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-box {
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #ff0000;
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
}

.dark-mode .search-input {
  background: #2d2d2d;
  border-color: #444;
  color: white;
}

.sort-button:hover {
  background: #f0f0f0;
}

.sort-button.active {
  background: #ff0000;
  color: white;
  border-color: #ff0000;
}

.dark-mode .sort-button {
  background: #2d2d2d;
  border-color: #444;
  color: white;
}

.dark-mode .sort-button:hover {
  background: #3d3d3d;
}

.results-counter {
  margin-bottom: 1.5rem;
  color: #666;
}

.dark-mode .results-counter {
  color: #aaa;
}

.no-videos {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
  color: #666;
}

.dark-mode .no-videos {
  color: #aaa;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
  }

  .header h1 {
    width: 100%;
    margin-bottom: 1rem;
  }

  .header .search-box {
    max-width: none;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>