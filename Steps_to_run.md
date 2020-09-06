### It is very easy to use our project if anyone wants. Just follow the steps :
  * To run Web-Part 
  1. Firstly if you are working locally then you need to install the following :
     - Node.js
     - MongoDB
     - VS Code ( recommended , Any other suitable code editor will work )
     - npm
  2.	Next you need to fork our project's GitHub repository and then clone it in your local PC.
  3. Open command line and navigate to the project folder. Then type the following command  ```npm install``` to install required dependencies :
     - djn
     - jnjks
     - klnf
  4. Your package.json file should look like this with the following dependencies :
     (PHOTO)
  5. After successful installation run the following command to start the application :  
     ```npm run dev```  
     
  If you see ***Server Has Started!!*** then you have successfully setup everything and good to go with our application.
  
  * To run ML-model
  1. You can run these notebooks on Jupyter notebook that comes with Conda Environment or you can use google colaboratory for this purpose.
  2. Anaconda and google colab has all libraries in built which we have used in this project but still if you find them missing then you can the following command in anaconda prompt :  
     ```pip install (missing lib)```  
     if using google colab use ```!pip install (missing lib)``` in a cell and run.
  3. Two resource files from nltk library are required, so you can run following commands in cell :  
     ```nltk.download('stopwords')```  
     ```nltk.download('punkt')```
