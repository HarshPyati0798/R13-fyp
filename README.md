# Final Year Project Setup Team - R13

### Backend Setup
1. Install the necessary libraries: tensorflow, matplotlib, sklean, numpy, PIL, pickle by typing in 
pip install <library-name> in the terminal for each of the above mentioned libraries.

2. Run the model.py file. This will train the image captioning model and create the .ckpt file which will be used by our api. 
To run the model.py file, type python model.py in the command line.

3. Go to text_gen/im2txt/im2txt/run_inference.py 

4. Edit lines 47 and 48 to paths where you have created the .ckpt and the .vocab file. 

5. Go to /api folder 

6. Start the backend server by typing python app.py in the terminal. This will start a local server at PORT 5000

### Frontend Setup

1. In the terminal, navigate to the /ui folder, and type npm install in the terminal. This will install the required dependencies.

2. Then, type npm run in the terminal, this will start the ui in a local server at PORT 3000.

### Using the site

1. Open a browser window and type localhost:3000 
This will show the website.
