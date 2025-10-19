import { ref, computed, onMounted } from 'vue';

export function useVideos() {
    const videos = ref([]);
    const loading = ref(true);
    const searchQuery = ref('');
    const sortByViews = ref(false);

    // mock video data
    const mockVideos = [
        {
            id: 1,
            title: "Ливерпуль VS Манчестер Юнайтед - Обзор",
            channel: "Setanta Sport",
            views: 48000,
            thumbnail: "https://i.ytimg.com/vi/lk6T6ssXanU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA2V11XAbZmHevhRfxC8IMZht1AOg"
        },
        {
            id: 2,
            title: "GOAT DEBATE FEATURING VOLK",
            channel: "Abu Dhabi Calendar",
            views: 377000,
            thumbnail: "https://i.ytimg.com/vi/yAhT_xCu5hs/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGAgYChgMA8=&rs=AOn4CLBZ-hv2IEmfxUMDljQEK3wpYCiNzw"
        },
        {
            id: 3,
            title: "iPhone 5s: распаковка",
            channel: "Wylsacom",
            views: 250000,
            thumbnail: "https://i.ytimg.com/vi/GXEpsh-yM-o/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCzEGrAVJmTbfDTjSG8pobo8WdpEQ"
        },
        {
            id: 4,
            title: "Grand Theft Auto VI Trailer 2",
            channel: "Rockstar",
            views: 134000,
            thumbnail: "https://i.ytimg.com/vi/VQRLujxTm3c/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDY1yheLYLt4kbo0GQBUaZnSZWrbw"
        },
        {
            id: 5,
            title: "632 - Fixing A New Compiler Bug I'm Yet To Discover 😅 (TempleOS | Livestream) [2016]",
            channel: "Absolute Terry Davis",
            views: 678000,
            thumbnail: "https://i.ytimg.com/vi/qjwjMA2SIFs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA67hJ0wk8eUyjCcoHfd4kdLBOE9A"
        },
        {
            id: 6,
            title: "Основные понятие Swift",
            channel: "iOS-Dev",
            views: 20000,
            thumbnail: "https://i.ytimg.com/vi/VZ5X74_Yypk/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB2AiAAtAFigIMCAAQARhlIGUoZTAP&rs=AOn4CLC7ajiAO9-sp43e1MfqR3Y8jk8xug"
        }
    ];

    // cоздаем вычисляемое свойство (computed), оно автоматически пересчитывается,
    // когда изменяются зависимости (videos, searchQuery, sortByViews)
    const filteredVideos = computed(() => {
        // cначала фильтруем список видео по названию или каналу, игнорируя регистр
        let filtered = videos.value.filter(video =>
            video.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            video.channel.toLowerCase().includes(searchQuery.value.toLowerCase())
        );

        // если включена сортировка по просмотрам, тогда сортируем массив по убыванию
        if (sortByViews.value) {
            filtered = [...filtered].sort((a, b) => b.views - a.views);
        }

        return filtered;
    });

    // при каждом вызове меняет sortByViews с true на false и наоборот
    const toggleSort = () => {
        sortByViews.value = !sortByViews.value;
    };

    // при монтировании компонента (onMounted) имитируем загрузку данных
    onMounted(() => {
        setTimeout(() => {
            // после задержки подставляем мок-данные в videos
            videos.value = mockVideos;
            // и выключаем индикатор загрузки
            loading.value = false;
        }, 1500);
    });

    // возвращаем переменные и функции,
    return {
        videos,
        loading,
        searchQuery,
        sortByViews,
        filteredVideos,
        toggleSort
    };
}