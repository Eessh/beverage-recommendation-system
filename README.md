<h1 align="center">
    <img src="./src/assets/images/Misc/BeverageLogo.png" valign="middle" width="180" height="180" alt="logo" />
    <a href="https://github.com/Eessh/beverage-recommendation-system/tree/recommendation_using_only_emotion">
        <span valign="middle">
                Beverage Recommendation System
        </span>
    </a>
</h1>

Recommends beverages based on age, gender, emotion, weather, and some other parameters.

![Home Page](./screenshots/home.jpeg)

![Settings Page](./screenshots/settings.jpeg)

> Data Collector: https://github.com/Eessh/beverage-recommendation-system-data-collector

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
```

## To run on local server
```bash
git clone -b recommendation_using_only_emotion https://github.com/Eessh/beverage-recommendation-system.git
cd beverage-recommendation-system/
npm install
npm run dev
```
