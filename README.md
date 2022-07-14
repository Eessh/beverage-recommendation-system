<h1 align="center">
    <img src="./public/favicons/android-chrome-72x72.png" valign="middle" width="150" height="150" alt="logo" />
    <a href="https://github.com/Eessh/beverage-recommendation-system/tree/recommendation_using_only_emotion">
        <span valign="middle">
                Beverage Recommendation System
        </span>
    </a>
</h1>

Recommends beverages based on age, gender, emotion, weather, and some other parameters.

> Data Collector: https://github.com/Eessh/beverage-recommendation-system-data-collector

Currently, this app was using only `emotions` for recommending beverages. We could also use `age, gender, weather, temperature` parameters for recommending beverages, we just need to enable them in the source code.

![Home Page](./screenshots/home.jpeg)

![Settings Page](./screenshots/settings.jpeg)

![Analysis Results Page](./screenshots/analysisResults.jpeg)

![Recommendation Page](./screenshots/recommendations.jpeg)

![Adding to Cart](./screenshots/addingToCart.jpeg)

## User Flow

```mermaid
flowchart TD
  A[Launch Screen] --> |Get Started| B[Detection Screen];
  A[Launch Screen] --> |Settings| C[Settings Page];
  C --> |After updation of settings| A;
  B --> D[Analysis Results Page];
  D --> |Retry| B;
  D --> E[Recommendation Page];
  E --> F[Cart Page];
  F --> G[Payment Page];
  G --> |State Refresh| A;
  G --> |Transaction| H[Data Collector API]
```

## Data Flow

```mermaid
flowchart TD
  A[Webcam Video Stream] --> |Video Frame| B[FaceAPI.js]
  B[FaceAPI.js] --> |age| C[Age average for every frame of video]
  B[FaceAPI.js] --> |gender| D[GlobalContext]
  B[FaceAPI.js] --> |emotion| E[Emotion average & applying weights for every frame of video]
  C[Age average for every frame of video] --> |Averaged Age| D[GlobalContext]
  E[Emotion average & applying weights for every frame of video] --> |Weighted & Averaged Emotions| D[GlobalContext]
  F[BeveragesData] --> G[Tagging System]
  H[Tags] --> G[Tagging System]
  G[Tagging System] --> I[UtilityFunction: getBeveragesByTag]
  J[Recommended Tags for each Emotion] --> K[Recommendation System]
  D[GlobalContext] --> |emotion| K[Recommendation System]
  K[Recommendation System] --> L[UtilityFunction: getRecommendedTagsForEmotion]
  D[GlobalContext] --> |emotion| M[Recommended Tags for predicted emotion]
  L[UtilityFunction: getRecommendedTagsForEmotion] --> |tags for the emotion| M[Recommended Tags for predicted emotion]
  M[Recommended Tags for predicted emotion] --> |recommended tags| N[Recommended Beverages]
  I[UtilityFunction: getBeveragesByTag] --> |Beverages for Recommended Tags| N[Recommended Beverages]
```

## To run on local server
```bash
git clone -b recommendation_using_only_emotion https://github.com/Eessh/beverage-recommendation-system.git
cd beverage-recommendation-system/
npm install
npm run dev
```
