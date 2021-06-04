# Image Search System

## Run the Front End Program

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Run the Back End Program

1. Download [imagenet](https://drive.google.com/open?id=1UOyZ8166qM3SzxGvaUeWpBzSUfoQLUjJ) folder, extraxt and keep it in server directory
2. Download datasets for [footwares](http://vision.cs.utexas.edu/projects/finegrained/utzap50k/), [apparels](http://mmlab.ie.cuhk.edu.hk/projects/DeepFashion/InShopRetrieval.html) keep them inside a directory under upload folder. Final folder strcture will be as below

```
      root folder  
      │
      └───lib
      │   
      └───server
      |   │───rest-server.py
      |   │───imagenet
      |   │───static
      |   │───templates
      |   │───uploads
      |        │────dogs_and_cats
      |              │────shoes
      |              │────sandals
      |              │────slippers
      |              │────boots
      |              │────apparels
```

3. Run image vectorizer which passes each data through an inception-v3 model and collects the bottleneck layer vectors and stores in disc. Edit dataset paths accordingly indide the image_vectorizer.py

```
  python server/image_vectorizer.py 
```

   This will generate two files namely, image_list.pickle and saved_features.txt. Keep them inside lib folder where search.py script is available.

4. Start the server by running rest-server.py. This project uses flask based REST implementation for UI

```
  python server/rest-server.py 
```

5. Once the server starts up, access the url 127.0.0.1:5000 to get the UI. Now upload any file and see 9 similar images. You can change the value of K from 9 to any values, but dont foreget to update the html file accordingly for displaying.

## Database

- Add a folder `server/database` to put the database and the tags inside

## Dependency

| Package        | Version |
| -------------- | ------- |
| Flask          | 0.12.5  |
| PyQt5          | 5.11.3  |
| numpy          | 1.19.5  |
| tensorflow     | 2.1.1   |
| Flask-HTTPAuth | 4.4.0   |
| scipy          | 1.4.1   |
| imageio        | 2.9.0   |
| Vue.js         | 3.0     |
| Element UI     | 2.0.11  |