export default class UnsplashService {

    access_key = 'r9VaJGZqZdsiOt4PpYAiHggFpkWQppK7BOGIdQEuXp8';

    async getTopics() {
        const result = await fetch('https://api.unsplash.com/topics/?client_id='+ this.access_key +'&per_page=10&page=2')
        .then(response => response.json());
        return result
    }

    async getTopicPhotos(topic, page = 1) {
        const result = await fetch('https://api.unsplash.com/topics/'+ topic +'/photos/?client_id='+ this.access_key +'&per_page=12&page='+page)
        .then(response => response.json());
        return result
    }
  
  }