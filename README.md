# NeuralNews

### Tagline:
A community of News Sharing network, with news being verified and unbiased to any ideology.

### The problem it solves:

We generally get to know about any incident through news media. But is it just a plain source of information describing the event and its implications? No, it is very often the problem with media houses presenting news along with their own ideology and interpretation. We hence see the same news being presented in one site as a tool against the government and the other one in a supporting manner. It affects the judgment of a common man who follows either of the two sources and he starts being motivated accordingly. This is what we consider a major reason for various social and ideological conflicts' which result in baseless protests or riots in some cases.<br>

Hence, our idea is to build a site that gets first-hand information from actual people living in these places and who have witnessed the event. These people are supposed to post this information in the form of an article on our page and based on the language we use an NLP model to predict whether the news appears to be impartial. These articles are reviewed by those people who verify themselves to be a part of that field as per their profile not build within 2 weeks of article publication. These articles and reviews can be flagged or sent for review to our moderators by those having a fixed reputation. People gain and lose reputation on the basis of the upvotes and downvotes on their reviews or articles.<br>

We can then allot incentives to the people contributing to the community in various ways based on the reputation and verified content they provide to the community, in order to maintain the quality and fairness of articles they provide.<br>
### Challenges we ran into:
Development is incomplete without debugging and testing continuously and scrolling through various solutions on Stack Overflow. Some of the problems we ran in are:

* Finding out a decent source of news articles in order to make a presentable report. We had a labeled dataset which was used to predict the reliability of news, and we are using it for training and cross-validation purpose. But we also needed some actual news on which we were willing to try our model, and we resorted to scraping webpages. But the dynamic pages with an advertisement in the same paragraph as the article were difficult to scrap. After searching a lot we found India today and Reuters to be ideal for our purpose.<br>

* Accuracy of Model: we were searching for algorithms for a long time and we tried a bunch of them, ranging from Logistic Regression, Bayes Classification, Random Forest Classifier, AdaBoost classifier, and then trying on LSTM. Although LSTM has the best accuracy of 93.7% on test data, it took 2 hours to train, hence we choose simple logistic regression. But then we faced inconsistency with the real-time dataset and hence following the recommendation of Mentor Shridhar we used Stopwords from NLP to improve the outcome.<br>
### Further Upgrades we aim to fulfill:
We are currently using Jupyter Notebooks and we plan to migrate to scripts with a better codebase in order to deploy the project. We also want to replace the Scrapper we use with actual people who are sources of first-hand information. Also, the Machine Learning part is a bit challenging as the models till now can predict whether an article is fake or real but it is not possible to obtain an article free from favor towards one side of the story. We will be working on it and hence will improve the model.<br>
